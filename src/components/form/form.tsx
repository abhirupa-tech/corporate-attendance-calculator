import { useState } from "react";

const AttendanceCalculator = () => {
  const [attendance, setAttendance] = useState("");

  return (
    <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Calculate Your Attendance
      </h2>

      {/* Bento-Style Grid for Attendance Selection & Percentage */}
      <div className="grid grid-cols-2 gap-4">
        {/* Attendance Percentage Box */}
        <div className="w-full h-24 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-center shadow-sm 
            hover:bg-gray-200 active:bg-gray-300 transition relative">
          <span className="text-sm text-gray-500">Attendance Percentage</span>
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
        <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center text-center font-medium text-gray-700 shadow-sm 
            hover:bg-gray-200 active:bg-gray-300 transition">
          Weekly
        </div>

        {/* Monthly Box */}
        <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center text-center font-medium text-gray-700 shadow-sm 
            hover:bg-gray-200 active:bg-gray-300 transition">
          Monthly
        </div>

        {/* Yearly Box */}
        <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center text-center font-medium text-gray-700 shadow-sm 
            hover:bg-gray-200 active:bg-gray-300 transition">
          Yearly
        </div>

        {/* Year-to-Date Box */}
        <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center text-center font-medium text-gray-700 shadow-sm 
            hover:bg-gray-200 active:bg-gray-300 transition">
          Year-to-Date
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalculator;