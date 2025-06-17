import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDayOfWeek, getMonthDetails } from "../backend/dateHandler";
import { RawDate } from "../backend/types";
import {
  addSelectedDay,
  changeCalendar,
  clearSelectedDays,
  removeSelectedDay,
} from "../redux/slices/calendarSlice";
import { updateAttendance } from "../redux/slices/userDataSlice";
import { RootState } from "../redux/store";
import { Notification } from "./notification";

const DatePicker: React.FC = () => {
  const selectedDays = useSelector(
    (state: RootState) => state.calendar.selectedDays
  );
  const days = useSelector((state: RootState) => state.calendar.days);
  const month = useSelector((state: RootState) => state.calendar.month);
  const year = useSelector((state: RootState) => state.calendar.year);
  const isWeekendDisabled = useSelector(
    (state: RootState) => state.userPreferences.isWeekendDisabled
  );

  const [showNotification, setShowNotification] = React.useState(true);

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
    if (calendarDay.year === today.year && calendarDay.month > today.month)
      return true;
    if (
      calendarDay.year === today.year &&
      calendarDay.month === today.month &&
      calendarDay.day > today.day
    )
      return true;
    return false;
  };

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(
      "Selected Days after update: ",
      selectedDays,
      "\n\ncount:",
      selectedDays.length
    );
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

  const updateUserAttendance = (day: RawDate, action: "add" | "remove") => {
    if (action === "add") dispatch(addSelectedDay(day));
    else dispatch(removeSelectedDay(day));
  };

  const handleDateClick = (day: RawDate) => {
    if (day) {
      if (!selectedDays.includes(day)) updateUserAttendance(day, "add");
      else updateUserAttendance(day, "remove");
    }
  };

  const shouldDisableBecauseWeekend = (date: RawDate) => {
    const isWeekend = getDayOfWeek(date) === 0 || getDayOfWeek(date) === 6;
    console.log(
      `Checking if ${date.day}/${date.month}/${date.year} is a weekend: ${isWeekend}`)
    return isWeekend && !isWeekendDisabled;
  };

  console.log("Days in DatePicker: ", days);

  return (
    <div className="w-full bg-transparent  rounded-lg p-2">
      <div className="flex items-center justify-between mb-4">
        {/* Left Navigator */}
        <button
          className="px-4 py-2 text-sm font-semibold text-gray-300 !bg-transparent rounded-md hover:!bg-transparent hover:text-gray-100 transition-colors duration-200 !hover:border-0"
          onClick={() => handlePreviousMonthNav()}
        >
          &lt;
        </button>

        {/* Calendar Header */}
        <div className="flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold text-gray-100 text-center">
            {getMonthDetails(month)}
          </h2>
          <h3 className="text-lg font-light text-gray-300">{year}</h3>
        </div>

        {/* Right Navigator */}
        <button
          className="px-4 py-2 text-sm font-semibold text-gray-300 !bg-transparent rounded-md hover:!bg-transparent hover:text-gray-100 transition-colors duration-200 !hover:border-0 !focus:outline-none !focus:ring-0 !focus:border-transparent"
          onClick={() => handleNextMonthNav()}
        >
          &gt;
        </button>
      </div>

      {/* Days Grid */}

      {/* Weekday Names Row  */}
      <div className="grid grid-cols-7 grid-rows-1 gap-3 mt-3 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-md h-auto font-bold text-gray-100">
            {day}
          </div>
        ))}
      </div>

      {/* Days of the week */}
      <div className="grid grid-cols-7 grid-rows-6 gap-3 mt-3 text-center">
        {days.map((date, index) => (
          <div
            key={index}
            className={`py-1 text-md flex items-center justify-center w-ful  rounded-md cursor-pointer transition-colors duration-200
        ${date && !(isFutureDay(date)) ? "bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-gray-700" : "text-gray-300"}
        ${isDateSelected(date) ? "bg-yellow-500 text-white font-bold" : ""}
        ${
          isFutureDay(date) || (date && shouldDisableBecauseWeekend(date))
            ? "bg-gray-900/10 backdrop-blur-lg border border-gray-500/20 text-gray-500 pointer-events-none"
            : ""
        }
        ${date === null} "pointer-events-none"`}
            onClick={() => handleDateClick(date)}
          >
            {date?.day ?? ""}
          </div>
        ))}
      </div>

      {showNotification && (
        <Notification
          onProceed={() => {
            setShowNotification(false);
          }}
          onIgnore={() => setShowNotification(false)}
        />
      )}

    </div>
  );
};

export default DatePicker;
