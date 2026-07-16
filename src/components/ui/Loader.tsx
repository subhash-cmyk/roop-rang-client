import { useLoader } from "../../context/LoaderContext";

export default function Loader() {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/50 backdrop-blur-sm">
      <div className="loader"></div>
    </div>
  );
}