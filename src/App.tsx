import React from 'react'
import { useState } from 'react'
import icon from '/icon.png'
import './App.css'

function App() {
  // Create a countdown timer
    const [currentState, setCurrentState] = useState('')
    const [currentTime, setCurrentTime] = useState(0)
    const [countdownTime, setCountdownTime] = useState(0)
    const intervalRef = React.useRef<number | undefined>()
    const onStart = () => {
      if (currentState === 'START') return
      setCurrentState('START')
      localStorage.setItem("timerStatus", currentState) 
      // chrome.storage.local.set({timerStatus: currentState})
      intervalRef.current = setInterval(() => {
        setCurrentTime((currentTime) => currentTime - 50)
      }, 50)
      chrome.alarms.create("time-is-up", {
        when: Date.now() + (countdownTime * 60 * 1000)
      })
    }

    const onSet = () => {
      if (currentState === 'START') return
      setCurrentTime(countdownTime * 60 * 1000)
    }

    const onStop = () => {
      if (currentState === 'STOP') return
      setCurrentState('STOP')
      localStorage.setItem("timerStatus", currentState)
      // chrome.storage.local.set({timerStatus: currentState})
      clearInterval(intervalRef.current)
      chrome.alarms.clearAll();
    }
  
    
    const sec = Math.floor(currentTime / 1000)
    const min = Math.floor(sec / 60)
    const seconds =  (sec % 60).toString().padStart(2,"0")
    const minutes =  (min % 60).toString().padStart(2,"0")

    
  return (
    <>
      <div>
          <img src={icon} className="logo" alt="Surf the Urge logo" />
      </div>
      <h1>Surf the Urge</h1>

      {currentState === 'START' ? <p>Time left:</p> : 
      
      <div>
        <p>Select the amount of time you want to stay focused for</p>
        <input type="range" min="1" max="20" value={countdownTime} onChange={(e) => setCountdownTime(parseInt(e.target.value))}></input>
        <button onClick={onSet}>Set focus time</button>
      </div>}

      <div className="card">
        <div className="timer">
          <span>{minutes}</span>:<span>{seconds}</span>
        </div>
        <button onClick={onStart}>Start</button>
        <button onClick={onStop}>Stop</button>
      </div>
      <p>You will receive a notification if you start focusing on something else or when the time is up</p>
    </>
  )
}

export default App
