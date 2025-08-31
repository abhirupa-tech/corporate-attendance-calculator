import React from "react";
import BentoGrid from "./bentoGrid";

const AttendanceTracker: React.FC = () => {
  return (
    <React.StrictMode>
      <p className="text-3xl p-5 bg-black/50 sm:bg-transparent sm:text-5xl [font-family:'Cormorant_Garamond',serif] mb-0 sm:mb-6 lg:mb-0 w-full sm:w-auto">
          Calculate Your{" "}
          <span className=" italic [font-variation-settings:'ital'_5]">
            Attendance
          </span>
          !
        </p>

      <BentoGrid />
    </React.StrictMode>
  );
};

export default AttendanceTracker;
