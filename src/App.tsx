import './App.css'
import AttendanceCalculator from './components/form/form'
import DatePicker from './components/datePicker/datePicker'

function App() {

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-pink-200">
      <AttendanceCalculator/>
      <DatePicker/>
    </div>
  )
}

export default App;
