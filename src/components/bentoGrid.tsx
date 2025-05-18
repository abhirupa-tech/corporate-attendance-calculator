import React from "react";
import { useState } from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import DatePicker from "./datePicker";


const BentoGrid: React.FC = () => {

    const [attendance, setAttendance] = useState("");

    const attendancePercentage = useSelector(
      (state: RootState) => state.userPreferences.currentScore
    );

    return (
        <div className="h-screen w-full flex items-center justify-center">
           <div className='grid h-full w-full grid-cols-4 grid-rows-3 gap-4 p-20 xl:m-32 lg:m-32 md:m-16 sm:m-8'>
                <div className="col-span-1 row-span-2 rounded-xl bg-yellow-100 text-black text-3xl p-4 border border-amber-50" style={{ fontVariationSettings: "'wght' 800" }}>
                    Hi Abhirupa!
                    Let's fix your scores!
                </div>
                <div className="col-span-1 row-span-1 w-full h-24 border border-gray-500 rounded-lg bg-transparent flex items-center justify-center text-center font-medium text-white shadow-sm 
                backdrop-blur-lg transition duration-300 ease-in-out 
                hover:scale-102 hover:shadow-xl hover:backdrop-blur-xl hover:bg-white/10">
                    Weekly: {attendancePercentage.weekly}%
                </div>

                
                <div className="col-span-1 row-span-1 w-full h-24 border border-gray-500 rounded-lg bg-transparent flex items-center justify-center text-center font-medium text-white shadow-sm 
                backdrop-blur-lg transition duration-300 ease-in-out 
                hover:scale-102 hover:shadow-xl hover:backdrop-blur-xl hover:bg-white/10">
                    Weekly: {attendancePercentage.monthly}%
                </div>

                
                <div className="col-span-1 row-span-1 w-full h-24 border border-gray-500 rounded-lg bg-transparent flex items-center justify-center text-center font-medium text-white shadow-sm 
                backdrop-blur-lg transition duration-300 ease-in-out 
                hover:scale-102 hover:shadow-xl hover:backdrop-blur-xl hover:bg-white/10">
                    Weekly: {attendancePercentage.yearly}%
                </div>

                <div className="col-span-2 row-span-2">
                    <DatePicker/>
                </div>
           </div>
        </div>
    );
};

export default BentoGrid;