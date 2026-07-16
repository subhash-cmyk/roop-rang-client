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

  // Register loader service once
  useEffect(() => {
    loaderService.register(showLoader, hideLoader);
  }, []);

  return (
    <LoaderContext.Provider
      value={{
        loading,
        showLoader,
        hideLoader,
      }}
    >
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