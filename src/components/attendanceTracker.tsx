import React from "react";
import BentoGrid from "./bentoGrid";

const AttendanceTracker: React.FC = () => {
  return (
    <React.StrictMode>
      <h1 className="text-5xl font-thin text-white leading-tight text-center">
        <p
          className="text-5xl [font-family:'Cormorant_Garamond',serif]"
          style={{ fontVariationSettings: "'wght' 200" }}
        >
          Calculate Your{" "}
          <span className=" italic [font-variation-settings:'ital'_5]">
            Attendance
          </span>
          !
        </p>
      </h1>

      <BentoGrid />
    </React.StrictMode>
  );
};

export default AttendanceTracker;
