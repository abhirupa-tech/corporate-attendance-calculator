import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addSelectedDay, setDayCount } from "../../redux/calendarSlice";
import { RawDate } from "../../backend/types";

const DatePicker: React.FC = () => {
    const dayCount = useSelector((state: RootState) => state.calendar.dayCount); // Updated to use `dayCount`
    const selectedDays = useSelector((state: RootState) => state.calendar.selectedDays);
    const startDayIndex = useSelector((state: RootState) => state.calendar.startDayIndex);
    const days = useSelector((state: RootState) => state.calendar.days);
    const dispatch = useDispatch();


    //To-do: Check current month and set day count
    useEffect(() => {
        dispatch(setDayCount(30));
    }, [dispatch]);

    const handleDateClick = (day: RawDate) => {
        if (day) {
            dispatch(addSelectedDay(day));
            console.log("Selected Days: ", selectedDays);
        }
    };

    return (
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md p-4">
            {/* Header */}
            <div className="text-center font-semibold text-lg border-b pb-2">
                April 2025
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 mt-3">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-xs font-bold text-gray-700 text-center">
                        {day}
                    </div>
                ))}
                {days.map((date, index) => ( // Now using `dayCount`
                    <div
                        key={index}
                        className={`w-10 h-10 flex items-center justify-center text-sm rounded-md cursor-pointer transition-colors duration-200
                            ${date ? "bg-gray-100 text-black hover:bg-gray-200" : "text-gray-300"} 
                            ${selectedDays.includes(date) ? "bg-yellow-500 text-white font-bold" : ""}`}
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