import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { loaderService } from "../services/loader";

type LoaderContextType = {
  loading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
};

const LoaderContext = createContext<LoaderContextType | null>(null);

export function LoaderProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  useEffect(() => {
    loaderService.register(showLoader, hideLoader);
  }, []);

 return (
  <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
    {loading && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-sm">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#A56B43]" />
      </div>
    )}

    {children}
  </LoaderContext.Provider>
);
}

export function useLoader() {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error("useLoader must be used inside LoaderProvider");
  }

  return context;
}