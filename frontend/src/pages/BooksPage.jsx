import { useState } from 'react'
import { useLibrary } from '../context/LibraryContext'

function BooksPage() {
  const { books, borrowBook } = useLibrary()
  const [selectedBook, setSelectedBook] = useState(null)

  const openBorrowModal = (book) => setSelectedBook(book)
  const closeBorrowModal = () => setSelectedBook(null)
  const confirmBorrow = () => {
    if (!selectedBook) return
    borrowBook(selectedBook.id)
    closeBorrowModal()
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
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BooksPage


