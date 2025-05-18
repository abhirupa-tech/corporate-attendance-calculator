import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMonthDetails } from "../backend/dateHandler";
import { RawDate } from "../backend/types";
import {
  addSelectedDay,
  changeCalendar,
  clearSelectedDays,
  removeSelectedDay,
} from "../redux/slices/calendarSlice";
import { updateAttendance } from "../redux/slices/userDataSlice";
import { RootState } from "../redux/store";

const DatePicker: React.FC = () => {
  const selectedDays = useSelector(
    (state: RootState) => state.calendar.selectedDays
  );
  const days = useSelector((state: RootState) => state.calendar.days);
  const month = useSelector((state: RootState) => state.calendar.month);
  const year = useSelector((state: RootState) => state.calendar.year);

  const today: RawDate = (() => {
    const now = new Date();
    return {
      day: now.getDate(),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    };
  })();

  const isFutureDay = (calendarDay: RawDate) => {
    if (!calendarDay) return false;
    if (calendarDay.year > today.year) return true;
    if (calendarDay.year === today.year && calendarDay.month > today.month) return true;
    if (calendarDay.year === today.year && calendarDay.month === today.month && calendarDay.day > today.day) return true;
    return false;
  };

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Selected Days after update: ", selectedDays, "\n\ncount:", selectedDays.length);
    dispatch(updateAttendance(selectedDays));
  }, [selectedDays, dispatch]);
  
  const handlePreviousMonthNav = () => {
    dispatch(changeCalendar("previous"));
  };

  const handleNextMonthNav = () => {
    dispatch(changeCalendar("next"));
  };

  const isDateSelected = (day: RawDate) => {
    if (!day) return false;
    return selectedDays.some(
      (selectedDay) =>
        selectedDay.day === day.day &&
        selectedDay.month === day.month &&
        selectedDay.year === day.year
    );
  };

  const updateUserAttendance = (day: RawDate, action : 'add' | 'remove') => {
    if(action === 'add') dispatch(addSelectedDay(day))
    else dispatch(removeSelectedDay(day));
  };

  const handleDateClick = (day: RawDate) => {
    if (day) {
      if (!selectedDays.includes(day)) updateUserAttendance(day, 'add');
      else updateUserAttendance(day, 'remove');
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        {/* Left Navigator */}
        <button
          className="px-4 py-2 text-sm font-semibold text-gray-700 !bg-gray-100 rounded-md hover:!bg-gray-300"
          onClick={() => handlePreviousMonthNav()}
        >
          &lt;
        </button>

        {/* Calendar Header */}
        <div className="flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-gray-800 text-center">
            {getMonthDetails(month)}
          </h2>
          <h3 className="text-md font-light text-gray-600">{year}</h3>
        </div>

        {/* Right Navigator */}
        <button
          className="px-4 py-2 text-sm font-semibold text-gray-700 !bg-gray-100 rounded-md hover:!bg-gray-300"
          onClick={() => handleNextMonthNav()}
        >
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
        ${date ? "bg-gray-100 text-black hover:bg-gray-200" : "text-gray-300"}
        ${isDateSelected(date) ? "bg-yellow-500 text-white font-bold" : ""}
        ${isFutureDay(date) ? "bg-gray-200 text-gray-400 pointer-events-none" : ""}
        ${date === null} "pointer-events-none"`}
            onClick={() => handleDateClick(date)}
          >
            {date?.day ?? ""}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      {/* <div className="flex flex-col gap-2 mt-4">
        <button
          className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
          onClick={() =>{}}
        >
          Clear Selection for Month
        </button>
        <button
          className="w-full px-4 py-2 text-sm font-medium text-red-600 bg-gray-100 rounded-md hover:bg-gray-200 transition"
          onClick={() => dispatch(clearSelectedDays())}
        >
          Clear All Selections
        </button>
      </div> */}

    </div>
  );
};

export default DatePicker;
