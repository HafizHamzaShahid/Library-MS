import axios from 'axios'

// Configure this baseURL to match your backend
const api = axios.create({
  baseURL: 'http://localhost:5000',
})

// Commented out - single user, no multiple users needed
// export const authApi = {
//   async login({ email, password }) {
//     if (!email || !password) {
//       throw new Error('Email and password are required')
//     }
//     const user = {
//       id: 'u1',
//       name: 'Demo User',
//       email,
//     }
//     const token = 'fake-jwt-token'
//     return fakeDelay({ data: { user, token } })
//   },

//   async signup({ name, email, password }) {
//     if (!name || !email || !password) {
//       throw new Error('All fields are required')
//     }
//     const user = {
//       id: 'u2',
//       name,
//       email,
//     }
//     const token = 'fake-jwt-token'
//     return fakeDelay({ data: { user, token } })
//   },
// }

export const booksApi = {
  // Get all books from backend
  async list() {
    try {
      const response = await api.get('/books/get-books')
      // Transform backend response to match frontend format
      const books = Array.isArray(response.data) ? response.data : []
      return {
        data: books.map(book => ({
          id: book.id || book._id?.toString() || `book-${Date.now()}`,
          title: book.title,
          author: book.author,
          year: book.year,
          status: book.status || 'available'
        }))
      }
    } catch (error) {
      console.error('Error fetching books:', error)
      // Return empty array on error instead of throwing
      return { data: [] }
    }
  },

  // Add a new book (suggest a book)
  async addBook({ title, author, year }) {
    try {
      const response = await api.post('/books/add-book', {
        title,
        author,
        year
      })
      // Transform backend response to match frontend format
      const bookData = response.data || {}
      return {
        data: {
          id: bookData.id || bookData._id?.toString() || `book-${Date.now()}`,
          title: bookData.title,
          author: bookData.author,
          year: bookData.year,
          status: bookData.status || 'available'
        }
      }
    } catch (error) {
      console.error('Error adding book:', error)
      throw error
    }
  },
}

export default api


