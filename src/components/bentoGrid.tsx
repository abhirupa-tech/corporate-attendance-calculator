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
 * A React functional component that displays a structured UI grid
 * for tracking attendance scores, date selection, and interactions.
 */
const BentoGrid: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentMonth = useSelector((state: RootState) => state.calendar.month);

  const attendancePercentage = useSelector(
    (state: RootState) => state.userPreferences.currentScore
  );
  const selectedDays = useSelector(
    (state: RootState) => state.calendar.selectedDays
  );
  const isWeekendsDisabled = useSelector(
    (state: RootState) => state.userPreferences.isWeekendDisabled
  );

  const [showNotification, setShowNotification] = React.useState(false);

  const handleCheckboxChange = (checked: boolean) => {
    if(checked) setShowNotification(true);
    else dispatch(shouldDisableWeekends(false));
    dispatch(updateAttendance(selectedDays));
  }

  const onProceedRemovingWeekends = () => {
    setShowNotification(false);
    dispatch(shouldDisableWeekends(true));
    dispatch(updateWeekendVisibility());
  }

  const onIgnoreRemovingWeekends = () => {
    setShowNotification(false);
    dispatch(shouldDisableWeekends(false));
  };

  return (

    <div className="w-full flex items-center justify-center">
      
      {/* Grid Layout */}
      <div className="max-w-[1400px] xl:max-h-[600px] grid h-auto xl:h-[80vh] w-full grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-5 gap-4 p-4 xl:mx-32 lg:mx-24 md:mx-16 sm:mx-8">
        {/* Greeting Box */}
        <div className="col-span-1 sm:col-span-2 xl:col-span-1 row-span-1 rounded-lg flex items-center justify-center text-center font-semibold bg-white/10 backdrop-blur-lg border border-white/30 px-2 sm:p-6 text-lg h-auto sm:h-full">
          Hi Abhirupa 👋 <br />
          Let's fix your scores!
        </div>

        {/* Weekly Attendance */}
        <div className="col-span-1 sm:col-span-2 xl:col-span-1 row-span-1 rounded-lg flex items-center justify-center text-center font-semibold text-lg h-auto sm:h-full relative sm:row-span-1 flex-col bg-white/10 backdrop-blur-md border border-white/20">
          <div className="top-0 left-0 w-full text-center text-lg text-white bg-white/20 py-2 rounded-t-lg">
            Weekly
          </div>
          <div className="flex items-center justify-center h-full text-xl font-bold text-white">
            {attendancePercentage.weekly}%
          </div>
        </div>

        

        {/* Monthly Attendance */}
        <div className="col-span-1 sm:col-span-2 xl:col-span-1 row-span-1 rounded-lg flex items-center justify-center text-center font-semibold text-lg h-auto sm:h-full relative sm:row-span-1 flex-col bg-white/10 backdrop-blur-md border border-white/20">
          <div className="top-0 left-0 w-full text-center text-lg text-white bg-white/20 py-2 rounded-t-lg">
            Monthly
          </div>
          <div className="flex items-center justify-center h-full text-xl font-bold text-white">
            {attendancePercentage.monthly}%
          </div>
        </div>

        {/* Annual Attendance */}
        <div className="relative col-span-1 row-span-1 flex flex-col bg-white/10 backdrop-blur-md border border-white/20 rounded-lg">
          <div className="top-0 left-0 w-full text-center text-lg text-white bg-white/20 py-2 rounded-t-lg">
            Annually
          </div>
          <div className="flex items-center justify-center h-full text-xl font-bold text-white">
            {attendancePercentage.yearly}%
          </div>
        </div>

        {/* Image Section */}
        {/* Hide on screens smaller than 'sm' */}
        <div className="hidden sm:block col-span-2 sm:col-span-1 row-span-1 sm:row-span-3 border rounded-2xl border-amber-50">
          <img
            src={asset1}
            alt="Hybrid Work Grid"
            className="w-full h-full object-cover rounded-2xl shadow-md"
          />
        </div>

        {/* Date Picker Section */}
        <div className="col-span-2 xl:row-span-4 row-span-4">
          <DatePicker />
        </div>

        {/* Work Mode Image */}
        <div className="row-span-2 xl:row-span-3 col-span-1">
          <img
            src={assetWork}
            alt="Work Mode"
            className="w-full h-full object-cover rounded-2xl shadow-md"
          />
        </div>

        <div className="row-span-1 col-span-1 flex flex-col gap-2 h-full">
          {/* Include Weekends Checkbox */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isWeekendsDisabled}
              onChange={() =>
                handleCheckboxChange(!isWeekendsDisabled)
              }
              className={`w-6 h-6 border border-gray-500 rounded-md ${
                isWeekendsDisabled
                  ? "bg-gray-700 rounded-md border-transparent"
                  : ""
              } focus:ring-2 focus:ring-gray-400`}
            />
            <span className="text-lg">Disable Weekends</span>
          </label>

          {/* Attribution Link */}
          <a
            href="https://thetravellingprogrammer"
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
          >
            <div className="h-full rounded-lg text-lg p-2 text-center bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center relative cursor-pointer text-white transition-colors duration-300 hover:bg-white/30 hover:backdrop-blur-xl">
              Built with ❤️ by Abhirupa
            </div>
          </a>
        </div>
        {/* Buttons & Link Section */}
        <div className="row-span-1 col-span-1 flex flex-col gap-2 h-full">
          {/* Clear Month Button */}
          <button
            className="border border-amber-50 w-full px-4 py-3 bg-gradient-to-tr from-[#4111f0] via-[#3815b7] to-[#1d0086] brightness-125 opacity-90 rounded-2xl transition duration-300 ease-in-out hover:bg-indigo-600"
            onClick={() => dispatch(clearSelectedDays(currentMonth))}
          >
            Clear Month Selection
          </button>
          {/* Clear All Button */}
          <button
            className="border border-amber-50 w-full px-4 py-3 bg-gradient-to-tr from-[#4111f0] via-[#3815b7] to-[#1d0086] brightness-125 opacity-90 rounded-2xl transition duration-300 ease-in-out hover:bg-indigo-600"
            onClick={() => dispatch(clearSelectedDays("all"))}
          >
            Clear Entire Selection
          </button>
        </div>
      </div>
      
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
