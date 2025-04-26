import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' 
import './App.css'
import AttendanceCalculator from './components/form/form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AttendanceCalculator/>
    </>
  )
}

export default App
