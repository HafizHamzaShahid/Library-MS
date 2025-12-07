import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { booksApi } from '../services/api'

const LibraryContext = createContext(null)

export function LibraryProvider({ children }) {
  const [books, setBooks] = useState([])
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch books from backend on mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await booksApi.list()
        setBooks(response.data || [])
      } catch (err) {
        console.error('Error fetching books:', err)
        setError(err.message || 'Failed to fetch books')
        setBooks([]) // Set empty array on error
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const addBook = async ({ title, author, year }) => {
    try {
      const response = await booksApi.addBook({ title, author, year })
      const newBook = response.data
      // Add the new book to the state
      setBooks((prev) => [newBook, ...prev])
    } catch (err) {
      console.error('Error adding book:', err)
      throw err // Re-throw so the component can handle the error
    }
  }

  const borrowBook = (bookId) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId && b.status === 'available'
          ? { ...b, status: 'checked_out' }
          : b,
      ),
    )
    const book = books.find((b) => b.id === bookId)
    if (book && book.status === 'available') {
      const today = new Date()
      const due = new Date(today)
      due.setDate(today.getDate() + 14)
      setLoans((prev) => [
        ...prev,
        {
          id: `l-${book.id}-${Date.now()}`,
          bookId: book.id,
          title: book.title,
          dueDate: due.toISOString().slice(0, 10),
          status: 'On time',
        },
      ])
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


