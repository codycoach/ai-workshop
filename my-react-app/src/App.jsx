import { useState } from 'react'
import './App.css'
import Datepicker from './components/Datepicker'

function App() {
  const [selectedDate, setSelectedDate] = useState('')

  return (
    <div className="App">
      <h1>Hello World!</h1>
      <p>Welcome to React with Vite</p>

      <div style={{ marginTop: 24 }}>
        <Datepicker
          label="Pick a date"
          value={selectedDate}
          onChange={setSelectedDate}
        />
        {selectedDate ? (
          <p style={{ marginTop: 12 }}>Selected: {selectedDate}</p>
        ) : null}
      </div>
    </div>
  )
}

export default App
