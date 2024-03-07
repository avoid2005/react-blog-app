import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="text-center">
        <h2 className="text-slate-700 font-bold text-2xl">Error 404</h2>
        <h2 className="font-bold text-3xl mt-4">Not Found Pages</h2>
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="text-slate-800 mt-6 py-1 px-4 border-b border-b-slate-800 active:text-blue-700"
        >
          Back
        </button>
      </div>
    </div>
  );
}
