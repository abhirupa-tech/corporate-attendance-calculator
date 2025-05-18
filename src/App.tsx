import './App.css';
import AttendanceTracker from './components/attendanceTracker';
function App() {

  return (
    <div className="p-12 min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-[#060618] via-[#010130] via-[#00154e] to-[#190050]
 text-white">
      <AttendanceTracker/>
    </div>
  )
}

export default App;
