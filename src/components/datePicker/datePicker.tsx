import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  addSelectedDay,
  setDayCount,
  removeSelectedDay,
  changeCalendar,
} from "../../redux/calendarSlice";
import { RawDate } from "../../backend/types";
import { getCurrentDate, getMonthDetails } from "../../backend/dateHandler";

const DatePicker: React.FC = () => {
  const dayCount = useSelector((state: RootState) => state.calendar.dayCount); // Updated to use `dayCount`
  const selectedDays = useSelector(
    (state: RootState) => state.calendar.selectedDays
  );
  const startDayIndex = useSelector(
    (state: RootState) => state.calendar.startDayIndex
  );
  const days = useSelector((state: RootState) => state.calendar.days);
  const now = useSelector((state: RootState) => state.calendar.now);
  const month = useSelector((state: RootState) => state.calendar.month);
  const year = useSelector((state: RootState) => state.calendar.year);

    const dispatch = useDispatch();



  //To-do: Check current month and set day count
  useEffect(() => {
    dispatch(setDayCount(30));
  }, [dispatch]);

  const handleDateClick = (day: RawDate) => {
    if (day) {
      if (!selectedDays.includes(day)) dispatch(addSelectedDay(day));
      else dispatch(removeSelectedDay(day));
    }
  };
  console.log("Updated Days: ", selectedDays);
  console.log("Updated Month: ", month);
  console.log("Updated Year: ", year);

  const handlePreviousMonthNav = () => {
    console.log("Previous Month");
    dispatch(changeCalendar("previous"));
  };

  const handleNextMonthNav = () => {
    console.log("Next Month");
    dispatch(changeCalendar("next"));
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        {/* Left Navigator */}
        <button className="px-4 py-2 text-sm font-semibold text-gray-700 !bg-gray-100 rounded-md hover:!bg-gray-300" onClick={() => handlePreviousMonthNav()}>
          &lt;
        </button>

        {/* Calendar Header */}
        <h2 className="text-lg font-semibold text-gray-800 text-center">
          {getMonthDetails(month)}
        </h2>

        {/* Right Navigator */}
        <button className="px-4 py-2 text-sm font-semibold text-gray-700 !bg-gray-100 rounded-md hover:!bg-gray-300" onClick={() => handleNextMonthNav()}>
          &gt;
        </button>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 mt-3 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-xs font-bold text-gray-700">
            {day}
          </div>
        ))}

        {days.map((date, index) => (
          <div
            key={index}
            className={`w-10 h-10 flex items-center justify-center text-sm rounded-md cursor-pointer transition-colors duration-200
          ${
            date ? "bg-gray-100 text-black hover:bg-gray-200" : "text-gray-300"
          }  
          ${
            selectedDays.includes(date)
              ? "bg-yellow-500 text-white font-bold"
              : ""
          }`}
            onClick={() => handleDateClick(date)}
          >
            {date?.day ?? ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatePicker;
