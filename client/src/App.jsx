import { useEffect, useState } from 'react'
import './App.css'
import RegisterPage from '../components/RegisterPage';
import { NavBar } from '../components/NavBar';
import {LoginPage} from '../components/LoginPage';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { HomePage } from '../components/HomePage';

function App() {

  const { user } = useContext(AuthContext)
  console.log('User state in App component:', user); 

  const [currentView, setCurrentView] = useState('login')

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
      {/* <NavBar setCurrentView={setCurrentView}/> */}
      <h1>Chirper</h1>
      <p>Message from your backend: <strong>{message}</strong></p>
      {user ? (
        <HomePage/>
      ) : (
        currentView === 'login' ? (
          <LoginPage setCurrentView={setCurrentView} />
        ) : (
          <RegisterPage setCurrentView={setCurrentView} />
        )
      )}
    </div>
  )
}

export default App
