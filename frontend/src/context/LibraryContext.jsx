import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { booksApi, loansApi } from '../services/api'

const LibraryContext = createContext(null)

export function LibraryProvider({ children }) {
  const [books, setBooks] = useState([])
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch books from backend on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const [booksRes, loansRes] = await Promise.all([
          booksApi.list(),
          loansApi.list(),
        ])
        setBooks(booksRes.data || [])
        setLoans(loansRes.data || [])
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(err.message || 'Failed to fetch data')
        setBooks([])
        setLoans([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const addBook = async ({ title, author, year }) => {
    try {
      const response = await booksApi.addBook({ title, author, year })
      const newBook = response.data
      setBooks((prev) => [newBook, ...prev])
    } catch (err) {
      console.error('Error adding book:', err)
      throw err
    }
  }

  const borrowBook = async (bookId) => {
    try {
      const response = await loansApi.borrow(bookId)
      const { book, loan } = response.data
      setBooks((prev) =>
        prev.map((b) =>
          b.id === book.id ? { ...b, status: book.status } : b,
        ),
      )
      setLoans((prev) => [...prev, loan])
    } catch (err) {
      console.error('Error borrowing book:', err)
      throw err
    }
  }

  const returnBook = async (loanId) => {
    try {
      const response = await loansApi.returnLoan(loanId)
      const returnedBookId = response.data.bookId
      setBooks((prev) =>
        prev.map((b) =>
          b.id === returnedBookId ? { ...b, status: 'available' } : b,
        ),
      )
      setLoans((prev) => prev.filter((loan) => loan.id !== loanId))
    } catch (err) {
      console.error('Error returning book:', err)
      throw err
    }
  }

  const stats = useMemo(
    () => ({
      totalBooks: books.length,
      borrowedCount: loans.length,
      overdueCount: loans.filter((l) => l.status === 'Overdue').length,
    }),
    [books.length, loans],
  )

  return (
    <LibraryContext.Provider
      value={{
        books,
        loans,
        addBook,
        borrowBook,
        returnBook,
        stats,
        loading,
        error,
      }}
    >
      {children}
    </LibraryContext.Provider>
  )
}

LibraryProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useLibrary = () => {
  const ctx = useContext(LibraryContext)
  if (!ctx) throw new Error('useLibrary must be used within LibraryProvider')
  return ctx
}


