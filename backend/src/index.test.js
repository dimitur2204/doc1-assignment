const request = require('supertest')
const app = require('./app')

describe('Backend API', () => {
  it('should return hello message', async () => {
    const response = await request(app)
      .get('/api/hello')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body).toEqual({
      message: 'Hello from the backend!'
    })
  })

  it('should handle CORS', async () => {
    const response = await request(app)
      .get('/api/hello')
      .set('Origin', 'http://localhost:5173')
      .expect(200)

    expect(response.body).toBeDefined()
  })

  it('should return 404 for non-existent endpoint', async () => {
    const response = await request(app)
      .get('/api/nonexistent')
      .expect(404)

    expect(response.body).toEqual({
      error: 'Not Found'
    })
  })
}) 
