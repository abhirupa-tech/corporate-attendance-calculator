import React from "react";
import { useState } from "react";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "./datePicker";
import asset1 from "./../assets/img/asset1.png";
import { clearSelectedDays } from "../redux/slices/calendarSlice";


const BentoGrid: React.FC = () => {

    const dispatch = useDispatch();

    const currentMonth = useSelector(
        (state: RootState) => state.calendar.month
    );
    const [attendance, setAttendance] = useState("");

    const attendancePercentage = useSelector(
        (state: RootState) => state.userPreferences.currentScore
    );

    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className='grid h-full w-full grid-cols-4 grid-rows-4 gap-4 p-20 xl:m-32 lg:m-32 md:m-16 sm:m-8'>
                <div className="col-span-1 row-span-2 rounded-xl text-left  [font-family:'Cormorant_Garamond',serif]  bg-gradient-to-b from-[#5d22f5] to-[#7e50f0] text-white text-3xl p-4 border border-amber-50" style={{ fontVariationSettings: "'wght' 800" }}>
                    Hi Abhirupa!
                    Let's fix your scores!
                </div>

                <div className="relative col-span-1 row-span-1">
                    <div className="absolute inset-0 backdrop-blur-lg bg-gradient-to-tr from-[#36364c] via-[#292745] to-[#3f218c] brightness-125 opacity-40 border border-amber-50 rounded-2xl"></div>
                    <div className="relative font-[var(--font-cormorant)]  text-white p-10 opacity-100">
                        Weekly: {attendancePercentage.weekly}%
                    </div>
                </div>

                <div className="relative col-span-1 row-span-1">
                    <div className="absolute inset-0 backdrop-blur-lg bg-gradient-to-tr from-[#36364c] via-[#292745] to-[#3f218c] brightness-125 opacity-20 border border-amber-50 rounded-2xl"></div>
                    <div className="relative font-[var(--font-cormorant)]  text-white p-10 opacity-100">
                        Monthly: {attendancePercentage.monthly}%
                    </div>
                </div>

                <div className="relative col-span-1 row-span-1">
                    <div className="absolute inset-0 backdrop-blur-lg bg-gradient-to-tr from-[#36364c] via-[#292745] to-[#3f218c] brightness-125 opacity-20 border border-amber-50 rounded-2xl"></div>
                    <div className="relative font-[var(--font-cormorant)]  text-white p-10 opacity-100">
                        Yearly: {attendancePercentage.yearly}%
                    </div>
                </div>

                <div className="col-span-2 row-span-3">
                    <DatePicker />
                </div>

                {/* Button Element */}
                <div className="row-span-1 col-span-1">
                    <button className="my-1 border border-amber-50 w-full px-2 py-2 !bg-gradient-to-tr from-[#5757b1] via-[#5d55cd] to-[#5a25e2] brightness-125 opacity-80 rounded-2xl transition-colors duration-300 ease-in-out hover:bg-indigo-600"
                        onClick={() => dispatch(clearSelectedDays(currentMonth))}
                    >
                        Clear Month Selection
                    </button>
                    <button
                        className="my-1 border border-amber-50 w-full px-2 py-2 !bg-gradient-to-tr from-[#5757b1] via-[#5d55cd] to-[#5a25e2] brightness-125 opacity-80 rounded-2xl !hover:bg-indigo-600 transition"
                        onClick={() => dispatch(clearSelectedDays("all"))}
                    >
                        Clear Entire Selection
                    </button>
                </div>

                <div className="col-span-1 row-span-2 border rounded-2xl border-amber-50">
                    <img src={asset1} alt="Descriptive Text" className="w-full h-full object-cover rounded-2xl shadow-md" />
                </div>

                <div className="col-span-1 row-span-2 rounded-2xl text-xl [font-family:'Cormorant_Garamond',serif] p-4 text-left bg-indigo-900 border border-amber-50">
                    You are doing great so far! You can skip 10 more days and still maintain your attendance over 70%!
                </div>

            </div>
        </div>
    );
};

export default BentoGrid;