import React from "react";
import { useState } from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const AttendanceCalculator = () => {
  const [attendance, setAttendance] = useState("");

  const attendancePercentage = useSelector(
    (state: RootState) => state.userPreferences.currentScore
  );

  return (
    <div className="relative max-w-5xl p-8 rounded-lg shadow-lg">

      {/* Content Wrapper */}
      <div className="relative font-[var(--font-cormorant)] text-white p-10">

        {/* Bento-Style Grid for Attendance Selection & Percentage */}
        <div className="grid grid-cols-2 gap-4">
          {/* Attendance Percentage Box */}
          <div className="w-full h-24 bg-white/10 rounded-lg flex flex-col items-center justify-center text-center shadow-sm 
              hover:bg-white/10 active:bg-white/30 transition relative">
            <span className="text-sm text-gray-300">Attendance Percentage</span>
            <div className="flex items-center mt-2 w-3/4">
              <input
                type="text"
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
                placeholder="Enter %"
                className="w-full px-3 py-1 border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-blue-300 appearance-none"
              />
              <button className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 active:bg-blue-700 transition">
                ➜
              </button>
            </div>
          </div>

          {/* Weekly Box */}
          <div className="w-full h-24 border border-gray-500 rounded-lg bg-transparent flex items-center justify-center text-center font-medium text-white shadow-sm 
              backdrop-blur-lg transition duration-300 ease-in-out 
              hover:scale-102 hover:shadow-xl hover:backdrop-blur-xl hover:bg-white/10">
            Weekly: {attendancePercentage.weekly}%
          </div>

          {/* Monthly Box */}
          <div className="w-full h-24 border border-gray-500 rounded-lg bg-transparent flex items-center justify-center text-center font-medium text-white shadow-sm 
              backdrop-blur-lg transition duration-300 ease-in-out 
              hover:scale-102 hover:shadow-xl hover:backdrop-blur-xl hover:bg-white/10">
            Monthly: {attendancePercentage.monthly}%
          </div>



          {/* Yearly Box */}
          <div className="w-full h-24 border border-gray-500 rounded-lg bg-transparent flex items-center justify-center text-center font-medium text-white shadow-sm 
              backdrop-blur-lg transition duration-300 ease-in-out 
              hover:scale-102 hover:shadow-xl hover:backdrop-blur-xl hover:bg-white/10">
            Yearly: {attendancePercentage.yearly}%
          </div>

          {/* Year-to-Date Box */}
          <div className="w-full h-24 border border-gray-500 rounded-lg bg-transparent flex items-center justify-center text-center font-medium text-white shadow-sm 
              backdrop-blur-lg transition duration-300 ease-in-out 
              hover:scale-102 hover:shadow-xl hover:backdrop-blur-xl hover:bg-white/10">
            {attendancePercentage.yearToDate}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalculator;
