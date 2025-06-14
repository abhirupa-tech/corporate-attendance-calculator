import React from "react";
import { useState } from "react";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "./datePicker";
import asset1 from "./../assets/img/grid-item-hybrid.png";
import assetWork from "./../assets/img/grid-image-work.png";
import { clearSelectedDays } from "../redux/slices/calendarSlice";

/**
 * BentoGrid Component
 *
 * A React functional component that renders a grid layout with various UI elements
 * such as attendance percentages, a date picker, and action buttons. This component
 * is designed to display attendance data and provide user interaction options.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered JSX element for the BentoGrid component.
 *
 * @remarks
 * - Utilizes `useSelector` to fetch state data from the Redux store.
 * - Dispatches actions using `useDispatch` to clear selected days.
 * - Includes responsive design with Tailwind CSS classes.
 *
 * @dependencies
 * - React
 * - Redux (useSelector, useDispatch)
 * - Tailwind CSS for styling
 *
 * @example
 * ```tsx
 * <BentoGrid />
 * ```
 *
 * @internal
 * This component is part of the corporate attendance calculator application.
 */
const BentoGrid: React.FC = () => {
  const dispatch = useDispatch();

  const currentMonth = useSelector((state: RootState) => state.calendar.month);
  const [attendance, setAttendance] = useState("");

  const attendancePercentage = useSelector(
    (state: RootState) => state.userPreferences.currentScore
  );

  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <div className="grid h-full w-full grid-cols-4 grid-rows-5 gap-4 pt-10 xl:m-32 lg:m-32 md:m-16 sm:m-8">
        <div
          className="col-span-1 row-span-2 rounded-lg flex items-center justify-center text-center [font-family:'Cormorant_Garamond',serif] bg-white/10 backdrop-blur-lg border border-white/30 p-6 text-3xl"
          //   style={{ fontVariationSettings: "'wght' 800" }}
        >
          Hi Abhirupa! Let's fix your scores!
        </div>
        <div className="relative col-span-1 row-span-1 flex flex-col bg-white/10 backdrop-blur-md border border-white/20 rounded-lg">
          {/* Weekly Banner - Full Width */}
          <div className="top-0 left-0 w-full text-center text-lg text-white bg-white/20 py-2 rounded-t-lg">
            Weekly
          </div>

          {/* Attendance Percentage - Centered */}
          <div className="flex items-center justify-center h-full text-xl font-bold text-white py">
            {attendancePercentage.weekly}%
          </div>
        </div>

        <div className="relative col-span-1 row-span-1 flex flex-col bg-white/10 backdrop-blur-md border border-white/20 rounded-lg">
          {/* Weekly Banner - Full Width */}
          <div className="top-0 left-0 w-full text-center text-lg text-white bg-white/20 py-2 rounded-t-lg">
            Monthly
          </div>

          {/* Attendance Percentage - Centered */}
          <div className="flex items-center justify-center h-full text-xl font-bold text-white py">
            {attendancePercentage.monthly}%
          </div>
        </div>

        <div className="relative col-span-1 row-span-1 flex flex-col bg-white/10 backdrop-blur-md border border-white/20 rounded-lg">
          {/* Weekly Banner - Full Width */}
          <div className="top-0 left-0 w-full text-center text-lg text-white bg-white/20 py-2 rounded-t-lg">
            Annually
          </div>

          {/* Attendance Percentage - Centered */}
          <div className="flex items-center justify-center h-full text-xl font-bold text-white py">
            {attendancePercentage.yearly}%
          </div>
        </div>

        <div className="col-span-2 row-span-4">
          <DatePicker />
        </div>
        <div className="row-span-2 col-span-1">
            <img src={assetWork}
            
            alt="Descriptive Text"
            className="w-full h-full object-cover rounded-2xl shadow-md"/>
        </div>

        <div className="col-span-1 row-span-3 border rounded-2xl border-amber-50">
          <img
            src={asset1}
            alt="Descriptive Text"
            className="w-full h-full object-cover rounded-2xl shadow-md"
          />
        </div>

        {/* Button Element */}
        <div className="row-span-2 col-span-1 flex flex-col gap-2 h-full">
          <a
            href="https://thetravellingprogrammer"
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
          >
            <div className="h-full rounded-lg text-xl [font-family:'Cormorant_Garamond',serif] p-2 text-center bg-white border border-gray-400 flex items-center justify-center relative cursor-pointer text-black transition-colors duration-300 hover:bg-gradient-to-b from-[#ffd3e3] to-[#f5a6c6]">
              Built with ❤️ by Abhirupa
            </div>
          </a>
          <button
            className="border border-amber-50 w-full px-2 py-2 !bg-gradient-to-tr from-[#4111f0] via-[#3815b7] to-[#1d0086] brightness-125 opacity-80 rounded-2xl transition-colors duration-300 ease-in-out hover:bg-indigo-600 flex-grow"
            onClick={() => dispatch(clearSelectedDays(currentMonth))}
          >
            Clear Month Selection
          </button>
          <button
            className="border border-amber-50 w-full px-2 py-2 !bg-gradient-to-tr from-[#4111f0] via-[#3815b7] to-[#1d0086] brightness-125 opacity-80 rounded-2xl hover:bg-indigo-600 transition flex-grow"
            onClick={() => dispatch(clearSelectedDays("all"))}
          >
            Clear Entire Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
