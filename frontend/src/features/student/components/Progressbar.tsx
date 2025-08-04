import { useState } from "react";
import { progressBar } from "../../student/types/progreess.types";

const ProgressBar = ({
  progress,
  color = "#4CAF50",
  height = "20px",
}: progressBar) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="w-80 mx-auto select-none font-sans">
      <div
        onClick={toggleOpen}
        className="flex items-center justify-between cursor-pointer bg-gray-100 rounded-lg p-3 shadow-md hover:bg-gray-200 transition"
        role="button"
        aria-expanded={isOpen}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleOpen();
          }
        }}
      >
        <span className="font-semibold text-gray-700">
          See Course Progress ⬇️
        </span>

        <svg
          className={`w-5 h-5 text-gray-600 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="mt-8 px-4 pb-8 bg-white rounded-b-md shadow-md border border-t-0 border-gray-200">
          <p className="text-gray-700 mb-3">
            Completed{" "}
            <span className="font-semibold">{progress?.completedLessons}</span>{" "}
            out of{" "}
            <span className="font-semibold">{progress?.totallessons}</span>{" "}
            lessons
          </p>

          <div
            className="w-full bg-gray-200 rounded-full h-6 overflow-hidden relative"
            style={{ height }}
          >
            <div
              className="h-6 rounded-full flex items-center justify-center text-white font-semibold text-sm transition-all duration-500"
              style={{
                width: `${progress?.percentagenumber}%`,
                backgroundColor: color,
              }}
            >
              {progress?.percentagenumber}%
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-600 flex items-center gap-2">
            <span>✅</span>
            Complete lessons to complete your course!
          </p>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
