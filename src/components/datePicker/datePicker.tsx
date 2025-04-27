import React, { useState, useEffect } from "react";

const DAYS_IN_MONTH = 30;
const START_DAY_INDEX = 2; // April 2025 starts on Tuesday

const DatePicker: React.FC = () => {
    const [calendarDays, setCalendarDays] = useState<(number | null)[]>([]);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);

    useEffect(() => {
        const daysArray: (number | null)[] = new Array(42).fill(null);
        for (let i = 0; i < DAYS_IN_MONTH; i++) {
            daysArray[START_DAY_INDEX + i] = i + 1;
        }
        setCalendarDays(daysArray);
    }, []);

    const handleDateClick = (day: number | null) => {
        if (day) {
            setSelectedDate(day);
            console.log(`Selected Date: April ${day}, 2025`);
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
                {calendarDays.map((day, index) => (
                    <div
                        key={index}
                        className={`w-10 h-10 flex items-center justify-center text-sm rounded-md cursor-pointer transition-colors duration-200 
                            ${day ? "bg-gray-100 text-black hover:bg-gray-200" : "text-gray-300"} 
                            ${selectedDate === day ? "bg-yellow-500 text-white font-bold" : ""}`}
                        onClick={() => handleDateClick(day)}
                    >
                        {day || ""}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DatePicker;