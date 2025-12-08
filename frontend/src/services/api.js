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

export const loansApi = {
  async list() {
    const response = await api.get('/loans')
    const loans = Array.isArray(response.data) ? response.data : []
    return {
      data: loans.map((loan) => ({
        id: loan.id || loan._id?.toString(),
        bookId: loan.bookId,
        title: loan.title,
        dueDate: loan.dueDate,
        status: loan.status || 'On time',
      })),
    }
  },

  async borrow(bookId) {
    const response = await api.post('/loans/borrow', { bookId })
    return {
      data: {
        book: {
          id: response.data.book.id,
          title: response.data.book.title,
          author: response.data.book.author,
          year: response.data.book.year,
          status: response.data.book.status,
        },
        loan: {
          id: response.data.loan.id || response.data.loan._id?.toString(),
          bookId: response.data.loan.bookId,
          title: response.data.loan.title,
          dueDate: response.data.loan.dueDate,
          status: response.data.loan.status || 'On time',
        },
      },
    }
  },

  async returnLoan(loanId) {
    const response = await api.post(`/loans/return/${loanId}`)
    return { data: response.data }
  },
}

export default api


