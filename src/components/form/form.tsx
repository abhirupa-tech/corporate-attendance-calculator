import { useState } from "react";

const AttendanceCalculator = () => {
  const [attendance, setAttendance] = useState("");
  const [period, setPeriod] = useState("monthly");

  const handleCalculate = () => {
    alert(`Calculating for ${period} period with ${attendance}% attendance.`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Attendance Calculator
        </h2>

        <div className="mb-4">
          <label htmlFor="attendance" className="block mb-2 text-sm font-medium text-gray-700">
            Attendance Percentage
          </label>
          <input
            id="attendance"
            type="number"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
            placeholder="Enter percentage"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="period" className="block mb-2 text-sm font-medium text-gray-700">
            Attendance Period
          </label>
          <select
            id="period"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default AttendanceCalculator;