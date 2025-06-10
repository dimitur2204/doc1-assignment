import { useState, useEffect } from 'react'
import axios from 'axios'
import config from './config'

function App() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/api/hello`, {
          withCredentials: true
        })
        setMessage(response.data.message)
        setError('')
      } catch (error) {
        console.error('Error fetching message:', error)
        setError('Error connecting to backend')
        setMessage('')
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
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p style={{ fontSize: '1.2rem', color: '#333' }}>{message}</p>
      )}
    </div>
  )
}

export default App 
