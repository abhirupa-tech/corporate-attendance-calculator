import './App.css';
import DatePicker from './components/datePicker';
import AttendanceCalculator from './components/form';

function App() {

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-pink-200">
      <AttendanceCalculator/>
      <DatePicker/>
    </div>
  )
}

export default App;
