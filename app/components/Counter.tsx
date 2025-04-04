"use client"; // ✅ Required for Next.js App Router

import useCounterStore from "@/app/store/useCounterStore";

const Counter = () => {
  // ✅ Explicitly type the store
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="flex flex-col items-center space-y-4 p-5 border rounded-lg shadow-md bg-white dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold">Counter: {count}</h1>
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded dark:bg-blue-700" onClick={increment}>
          ➕ Increment
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded dark:bg-red-700" onClick={decrement}>
          ➖ Decrement
        </button>
        <button className="px-4 py-2 bg-gray-500 text-white rounded dark:bg-gray-700" onClick={reset}>
          🔄 Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
