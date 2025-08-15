import { useEffect, useState } from 'react'
import './App.css'
import RegisterPage from '../components/RegisterPage';

function App() {

  const [message, setMessage] = useState("");

  useEffect( () => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api")
        const data = await response.json()
        setMessage(data.message)
      } catch (error) {
        console.error("Error fetchin data",error);
        setMessage("Could not connect to yout backend")
      }
    }
    fetchData();
  },[])

  return (
    <div>
      <h1>Chirper</h1>
      <p>Message from your backend: <strong>{message}</strong></p>
      <RegisterPage/>
    </div>
  )
}

export default App
