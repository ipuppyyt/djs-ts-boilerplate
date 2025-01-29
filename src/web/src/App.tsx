import React, { useState } from "react";

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <header className="flex items-center space-x-4 p-8">
        <h1 className="text-4xl font-bold">Vite + ReactTS SWC + Tailwind CSS</h1>
      </header>

      <main className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition-all duration-200"
          >
            Count is: {count}
          </button>
          <p className="mt-4 text-gray-400">
            Edit{" "}
            <code className="bg-gray-800 px-1 py-0.5 rounded">src/App.tsx</code>{" "}
            and save to test HMR
          </p>
        </div>
      </main>

      <footer className="mt-12 p-4 text-center text-gray-500 text-xs">
        <p>Click on the Vite and React logos to learn more</p>
        <div className="flex justify-center space-x-6 mt-2">
          <a
            href="https://vitejs.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/vite.svg" alt="Vite logo" className="w-10 h-10" />
          </a>
          <a
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/react.svg"
              alt="React logo"
              className="w-10 h-10"
            />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
