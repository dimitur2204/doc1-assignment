import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import App from './App'
import axios from 'axios'

// Mock axios
vi.mock('axios')

describe('App Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks()
  })

  it('renders the hello world heading', () => {
    // Mock successful API response
    axios.get.mockResolvedValueOnce({ data: { message: 'Hello from the backend!' } })
    
    const { getByText } = render(<App />)
    expect(getByText('Hello World App')).toBeTruthy()
  })

  it('displays error message when API call fails', async () => {
    // Mock failed API response
    axios.get.mockRejectedValueOnce(new Error('API Error'))
    
    const { findByText } = render(<App />)
    const errorMessage = await findByText('Error connecting to backend')
    expect(errorMessage).toBeTruthy()
  })

  it('displays message from backend when API call succeeds', async () => {
    const testMessage = 'Test message from backend'
    axios.get.mockResolvedValueOnce({ data: { message: testMessage } })
    
    const { findByText } = render(<App />)
    const message = await findByText(testMessage)
    expect(message).toBeTruthy()
  })
}) 