import axios from 'axios'

// Configure this baseURL to match your backend later
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
})

// For now we mock responses so you can focus on the frontend
const fakeDelay = (result, ms = 400) =>
  new Promise((resolve) => setTimeout(() => resolve(result), ms))

export const authApi = {
  async login({ email, password }) {
    // Replace with: return api.post('/auth/login', { email, password })
    if (!email || !password) {
      throw new Error('Email and password are required')
    }
    // very basic fake user
    const user = {
      id: 'u1',
      name: 'Demo User',
      email,
    }
    const token = 'fake-jwt-token'
    return fakeDelay({ data: { user, token } })
  },

  async signup({ name, email, password }) {
    if (!name || !email || !password) {
      throw new Error('All fields are required')
    }
    const user = {
      id: 'u2',
      name,
      email,
    }
    const token = 'fake-jwt-token'
    return fakeDelay({ data: { user, token } })
  },
}

export const booksApi = {
  async list() {
    const books = [
      {
        id: 'b1',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        year: 2008,
        available: true,
      },
      {
        id: 'b2',
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt, David Thomas',
        year: 1999,
        available: false,
      },
      {
        id: 'b3',
        title: 'You Don’t Know JS Yet',
        author: 'Kyle Simpson',
        year: 2020,
        available: true,
      },
    ]
    return fakeDelay({ data: books })
  },
}

export default api


