import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL || 'http://localhost:3000/api/hello')
                console.log('Response:', response.data)
        setMessage(response.data.message)
      } catch (error) {
        console.error('Error fetching message:', error)
        setMessage('Error connecting to backend')
      }
    }

    fetchMessage()
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f2f5'
    }}>
      <h1 style={{ color: '#1a73e8' }}>Hello World App</h1>
      <p style={{ fontSize: '1.2rem', color: '#333' }}>{message}</p>
    </div>
  )
}

export default App 
