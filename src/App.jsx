import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from "axios"
import './App.css'
import Card from './components/Card'
import Person from './components/Media'



axios.defaults.baseURL ="http://localhost:2030";

function App() {
  const [team, setTeam] = useState(null);

  return (
    <>
      <div className='container'>
        <header className=' d-flex align-items-center justify-content-between'>
          <div className='d-flex'>
            <a href="https://vitejs.dev"><img src={viteLogo} className="logo" alt="Vite logo" /></a>
            <a href="https://react.dev"><img src={reactLogo} className="logo react" alt="React logo" /></a>
          </div>
          <h3>Axios-JsonServer</h3>
          <h5>React-Vite</h5>
        </header>

      </div>
      <div className='container'>
          <Card 
          team ={team}
          setTeam={setTeam} 
         />
      </div>
    </>
  )
}

export default App
