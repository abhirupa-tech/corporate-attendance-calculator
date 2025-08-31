import React from "react";
import BentoGrid from "./bentoGrid";

const AttendanceTracker: React.FC = () => {
  return (
    <React.StrictMode>
      <p className="text-3xl p-5 bg-black/50 sm:bg-transparent sm:text-5xl lg:text-4xl [font-family:'Cormorant_Garamond',serif] mb-0 sm:mb-6 lg:mb-0 w-full sm:w-auto">
        Calculate Your{" "}
        <span className=" italic [font-variation-settings:'ital'_5]">
          Attendance
        </span>
        !
      </p>

      <BentoGrid />
      <div className="max-w-[1000px] text-center px-8">
        <p className="italic text-sm text-gray-400">
          Disclaimer: Data is stored in your browser's cache. Please bookmark this page to return to your saved progress.
        </p>
      </div>
    </React.StrictMode>
  );
};

export default AttendanceTracker;
