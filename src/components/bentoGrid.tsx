import React from "react";
import { useDispatch, useSelector } from "react-redux";
import assetWork from "../assets/img/grid-image-work.png";
import asset1 from "../assets/img/grid-item-hybrid.png";
import { clearSelectedDays } from "../redux/slices/calendarSlice";
import { shouldDisableWeekends, updateAttendance } from "../redux/slices/userDataSlice";
import { AppDispatch, RootState } from "../redux/store";
import { updateWeekendVisibility } from "../redux/thunks/calendarUserDataSyncThunk";
import DatePicker from "./datePicker";
import { Notification } from "./notification";

/**
 * BentoGrid Component
 *
 * Displays a structured grid for attendance scores, date selection,
 * and related user interactions.
 */
const BentoGrid: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const currentMonth = useSelector((state: RootState) => state.calendar.month);
  const attendancePercentage = useSelector((state: RootState) => state.userPreferences.currentScore);
  const selectedDays = useSelector((state: RootState) => state.calendar.selectedDays);
  const isWeekendsDisabled = useSelector((state: RootState) => state.userPreferences.isWeekendDisabled);

  const [showNotification, setShowNotification] = React.useState(false);

  const handleCheckboxChange = (checked: boolean) => {
    if (checked) setShowNotification(true);
    else dispatch(shouldDisableWeekends(false));
    dispatch(updateAttendance(selectedDays));
  };

  const onProceedRemovingWeekends = () => {
    setShowNotification(false);
    dispatch(shouldDisableWeekends(true));
    dispatch(updateWeekendVisibility());
  };

  const onIgnoreRemovingWeekends = () => {
    setShowNotification(false);
    dispatch(shouldDisableWeekends(false));
  };

  return (
    <div className="w-full flex items-center justify-center">
      {/* Grid Layout */}
      <div className="m-h-auto max-w-[1400px] w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 xl:grid-cols-4 lg:grid-cols-4 gap-4 p-4 xl:mx-32 lg:mx-24 md:mx-16 sm:mx-8 items-stretch">
        
        {/* Greeting Box */}
        <div className="h-[8vh] sm:h-auto col-span-1 text-sm md:text-md sm:col-span-3 md:col-span-6 lg:col-span-1 xl:col-span-1 rounded-lg flex items-center justify-center text-center font-semibold bg-white/10 backdrop-blur-lg border border-white/30 px-2 sm:p-6 text-md sm:text-lg sm:h-auto">
          Hello Earthling 👋
        </div>

        {/* Weekly Attendance */}
        <div className="h-[8vh] sm:h-auto col-span-1 md:col-span-2 lg:col-span-1 rounded-lg flex flex-col items-center justify-center text-center font-semibold sm:h-auto relative bg-white/10 backdrop-blur-md border border-white/20">
          <div className="top-0 left-0 w-full text-center text-sm xl:text-lg sm:text-lg text-white bg-white/20 py-2 rounded-t-lg">
            Weekly
          </div>
          <div className="flex items-center justify-center h-full text-md md:text-xl font-bold text-white sm:p-4">
            {attendancePercentage.weekly}%
          </div>
        </div>

        {/* Monthly Attendance */}
        <div className="h-[8vh] sm:h-auto col-span-1 md:col-span-2 lg:col-span-1 rounded-lg flex flex-col items-center justify-center text-center font-semibold sm:h-auto relative bg-white/10 backdrop-blur-md border border-white/20">
          <div className="top-0 left-0 w-full text-center text-sm xl:text-lg text-white bg-white/20 py-2 rounded-t-lg">
            Monthly
          </div>
          <div className="flex items-center justify-center h-full text-md md:text-xl font-bold text-white sm:p-4">
            {attendancePercentage.monthly}%
          </div>
        </div>

        {/* Annual Attendance */}
        <div className="h-[8vh] sm:h-auto relative md:col-span-2 lg:col-span-1 col-span-1 flex flex-col bg-white/10 backdrop-blur-md border border-white/20 rounded-lg">
          <div className="top-0 left-0 w-full text-center text-sm xl:text-lg text-white bg-white/20 py-2 rounded-t-lg">
            Annually
          </div>
          <div className="flex items-center justify-center h-full text-md md:text-xl  font-bold text-white sm:p-4">
            {attendancePercentage.yearly}%
          </div>
        </div>

        {/* Image Section (hidden on small screens) */}
        <div className="hidden md:block md:col-span-2 lg:col-span-1 sm:col-span-1 row-span-1 sm:row-span-5 lg:row-span-2 border rounded-2xl border-amber-50">
          <img
            src={asset1}
            alt="Hybrid Work Grid"
            className="w-full h-full object-cover rounded-2xl shadow-md"
          />
        </div>

        {/* Date Picker Section */}
        <div className="col-span-2 sm:col-span-3 sm:row-span-4 md:col-span-6 lg:col-span-2 xl:row-span-4 row-span-6">
          <DatePicker />
        </div>

        {/* Work Mode Image */}
        <div className="hidden md:block row-span-2 lg:row-span-3 md:col-span-2 lg:col-span-1 col-span-1">
          <img
            src={assetWork}
            alt="Work Mode"
            className="w-full h-full object-cover rounded-2xl shadow-md"
          />
        </div>

        {/* Buttons & Links (LG and up) */}
        <div className="hidden lg:block lg:col-span-1 lg:row-span-2 md:flex-col gap-2 h-full">
          <button
            className="border mb-4 border-amber-50 w-full px-4 py-3 bg-gradient-to-tr from-[#4111f0] via-[#3815b7] to-[#1d0086] brightness-125 opacity-90 rounded-2xl transition duration-300 ease-in-out hover:bg-indigo-600"
            onClick={() => dispatch(clearSelectedDays(currentMonth))}
          >
            Clear Month
          </button>
          <button
            className="border border-amber-50 w-full px-4 py-3 bg-gradient-to-tr from-[#4111f0] via-[#3815b7] to-[#1d0086] brightness-125 opacity-90 rounded-2xl transition duration-300 ease-in-out hover:bg-indigo-600"
            onClick={() => dispatch(clearSelectedDays("all"))}
          >
            Clear All Dates
          </button>
        </div>

        {/* Disable Weekends + Attribution */}
        <div className="row-span-1 col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-1 flex flex-col gap-2 h-full">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isWeekendsDisabled}
              onChange={() => handleCheckboxChange(!isWeekendsDisabled)}
              className={`w-6 h-6 border border-gray-500 rounded-md ${
                isWeekendsDisabled ? "bg-gray-700 border-transparent" : ""
              } focus:ring-2 focus:ring-gray-400`}
            />
            <span className="text-lg">Disable Weekends</span>
          </label>

          <a
            href="https://thetravellingprogrammer"
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
          >
            <div className="hidden md:block h-full rounded-lg text-lg p-2 text-center bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center relative cursor-pointer text-white transition-colors duration-300 hover:bg-white/30 hover:backdrop-blur-xl">
              Built with ❤️ by Abhirupa
            </div>
          </a>
        </div>

        {/* Buttons (Mobile / Tablet) */}
        <div className="lg:hidden row-span-1 col-span-2 flex flex-row sm:col-span-3 md:col-span-4 lg:col-span-2 md:flex-col gap-2 h-full">
          <button
            className="border border-amber-50 w-full px-4 py-3 bg-gradient-to-tr from-[#4111f0] via-[#3815b7] to-[#1d0086] brightness-125 opacity-90 rounded-2xl transition duration-300 ease-in-out hover:bg-indigo-600"
            onClick={() => dispatch(clearSelectedDays(currentMonth))}
          >
            Clear Month
          </button>
          <button
            className="border border-amber-50 w-full px-4 py-3 bg-gradient-to-tr from-[#4111f0] via-[#3815b7] to-[#1d0086] brightness-125 opacity-90 rounded-2xl transition duration-300 ease-in-out hover:bg-indigo-600"
            onClick={() => dispatch(clearSelectedDays("all"))}
          >
            Clear All Dates
          </button>
        </div>

        {/* Attribution (Mobile) */}
        <div className="md:hidden h-full col-span-2 sm:col-span-3 rounded-lg text-lg p-2 text-center bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center relative cursor-pointer text-white transition-colors duration-300 hover:bg-white/30 hover:backdrop-blur-xl">
          Built with ❤️ by Abhirupa
        </div>
      </div>

      {/* Notification */}
      {showNotification && (
        <Notification
          onProceed={onProceedRemovingWeekends}
          onIgnore={onIgnoreRemovingWeekends}
        />
      )}
    </div>
  );
};

export default BentoGrid;
