import Homw from "./components/Homw";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          AI Image Enhancer
        </h1>
        <p className="text-base sm:text-lg text-gray-500 max-w-md mx-auto">
          Upload your image and let AI enhance it in seconds!
        </p>
      </div>

      <Homw />

      <div className="text-xs sm:text-sm text-gray-500 mt-6">
        Powered By <span className="font-semibold">@AnujAI</span>
      </div>
    </div>
  );
}

export default App;
