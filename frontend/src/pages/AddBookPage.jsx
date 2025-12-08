import { useState } from 'react'
import { useLibrary } from '../context/LibraryContext'

function AddBookPage() {
  const { addBook } = useLibrary()
  const [newBook, setNewBook] = useState({ title: '', author: '', year: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess(false)
    
    const trimmedTitle = newBook.title.trim()
    const trimmedAuthor = newBook.author.trim()
    const parsedYear = Number(newBook.year)
    const currentYear = new Date().getFullYear()
    const isValidYear =
      Number.isInteger(parsedYear) && parsedYear >= 1450 && parsedYear <= currentYear
    
    if (!trimmedTitle || !trimmedAuthor || !parsedYear) {
      setError('Please fill in all fields')
      return
    }

    if (!isValidYear) {
      setError(`Year must be an integer between 1450 and ${currentYear}`)
      return
    }

    try {
      setLoading(true)
      await addBook({ title: trimmedTitle, author: trimmedAuthor, year: parsedYear })
      setNewBook({ title: '', author: '', year: '' })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err.message || 'Failed to add book. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <h1>Suggest a new book</h1>
      <p className="page-subtitle">
        Enter the details below to add a new title to the library collection.
      </p>
      <form className="book-form" onSubmit={handleSubmit}>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">Book added successfully!</div>}
        <div className="book-form-row">
          <input
            type="text"
            placeholder="Book title"
            value={newBook.title}
            onChange={(event) =>
              setNewBook((prev) => ({ ...prev, title: event.target.value }))
            }
            disabled={loading}
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(event) =>
              setNewBook((prev) => ({ ...prev, author: event.target.value }))
            }
            disabled={loading}
          />
          <input
            type="number"
            placeholder="Year"
            value={newBook.year}
            onChange={(event) =>
              setNewBook((prev) => ({ ...prev, year: event.target.value }))
            }
            disabled={loading}
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Adding...' : 'Suggest book'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddBookPage



