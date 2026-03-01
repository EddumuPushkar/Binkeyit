import React from "react";

function Loading() {
  return (
    <div className="flex justify-center items-center h-40">
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-10 h-10 text-gray-300 animate-spin fill-green-500"
          viewBox="0 0 100 101"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.59C100 78.2 77.61 100.59 50 100.59C22.38 100.59 0 78.2 0 50.59C0 22.97 22.38 0.59 50 0.59C77.61 0.59 100 22.97 100 50.59Z"
            fill="currentColor"
          />
          <path
            d="M93.96 39.04C96.39 38.4 97.86 35.91 97 33.55C95.29 28.82 92.87 24.36 89.81 20.34C85.84 15.11 80.88 10.72 75.21 7.41C69.54 4.1 63.27 1.94 56.76 1.05C51.76 0.36 46.69 0.44 41.73 1.27C39.26 1.69 37.81 4.19 38.45 6.62C39.08 9.04 41.56 10.47 44.05 10.1C47.85 9.54 51.71 9.52 55.54 10.04C60.86 10.77 65.99 12.54 70.63 15.25C75.27 17.96 79.33 21.56 82.58 25.84C84.91 28.91 86.79 32.29 88.18 35.87C89.08 38.21 91.54 39.67 93.96 39.04Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;