import { useNavigate } from "react-router-dom";

const Requesterror = () => {
  // not finished yet**************************************************

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6 ">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-red-500">
        Oops!
      </h1>
      <p className="text-lg md:text-xl mb-6 text-center ">
        Something went wrong. Please try again later.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-red-700 hover:bg-red-500 transition rounded-lg text-white font-bold"
        >
          Go Home
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 transition rounded-lg text-white font-semibold"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

export default Requesterror;
