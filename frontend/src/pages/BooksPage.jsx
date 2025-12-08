import { useState } from 'react'
import { useLibrary } from '../context/LibraryContext'

function BooksPage() {
  const { books, borrowBook, loading, error } = useLibrary()
  const [selectedBook, setSelectedBook] = useState(null)
  const [borrowError, setBorrowError] = useState('')
  const [borrowLoading, setBorrowLoading] = useState(false)

  const openBorrowModal = (book) => setSelectedBook(book)
  const closeBorrowModal = () => setSelectedBook(null)
  const confirmBorrow = async () => {
    if (!selectedBook) return
    try {
      setBorrowError('')
      setBorrowLoading(true)
      await borrowBook(selectedBook.id)
      closeBorrowModal()
    } catch (err) {
      setBorrowError(err.message || 'Failed to borrow book')
    } finally {
      setBorrowLoading(false)
    }
  }

  const getStatusLabel = (status) => {
    if (status === 'available') return 'Available'
    if (status === 'checked_out') return 'Checked out'
    return 'Not available'
  }

  const getStatusClass = (status) => {
    if (status === 'available') return 'badge badge-success'
    if (status === 'checked_out') return 'badge badge-muted'
    return 'badge badge-danger'
  }

  return (
    <div className="page">
      <h1>Browse books</h1>
      <p className="page-subtitle">
        Explore the collection and check availability at a glance.
      </p>
      {loading && <p>Loading books...</p>}
      {error && <div className="alert alert-error">{error}</div>}
      {borrowError && <div className="alert alert-error">{borrowError}</div>}
      {!loading && !error && books.length === 0 && (
        <p>No books available. Be the first to suggest a book!</p>
      )}
      <div className="books-grid">
        {books.map((book) => (
          <article key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p className="book-author">{book.author}</p>
            <p className="book-meta">{book.year}</p>
            <div className="book-footer">
              <span className={getStatusClass(book.status)}>
                {getStatusLabel(book.status)}
              </span>
              {book.status === 'available' && (
                <button
                  type="button"
                  className="btn-primary btn-sm"
                  onClick={() => openBorrowModal(book)}
                >
                  Borrow
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
      {selectedBook && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={closeBorrowModal}
        >
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <h3>Confirm borrow</h3>
            <p>
              Borrow <strong>{selectedBook.title}</strong> by {selectedBook.author}?
            </p>
            <div className="modal-buttons">
              <button
                type="button"
                className="btn-secondary btn-sm"
                onClick={closeBorrowModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary btn-sm"
                onClick={confirmBorrow}
                disabled={borrowLoading}
              >
                {borrowLoading ? 'Borrowing...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BooksPage


