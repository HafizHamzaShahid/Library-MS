import { useState } from 'react'
import { useLibrary } from '../context/LibraryContext'

function AddBookPage() {
  const { addBook } = useLibrary()
  const [newBook, setNewBook] = useState({ title: '', author: '', year: '' })

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedTitle = newBook.title.trim()
    const trimmedAuthor = newBook.author.trim()
    const parsedYear = Number(newBook.year)
    if (!trimmedTitle || !trimmedAuthor || !parsedYear) return
    addBook({ title: trimmedTitle, author: trimmedAuthor, year: parsedYear })
    setNewBook({ title: '', author: '', year: '' })
  }

  return (
    <div className="page">
      <h1>Suggest a new book</h1>
      <p className="page-subtitle">
        Enter the details below to add a new title to the library collection.
      </p>
      <form className="book-form" onSubmit={handleSubmit}>
        <div className="book-form-row">
          <input
            type="text"
            placeholder="Book title"
            value={newBook.title}
            onChange={(event) =>
              setNewBook((prev) => ({ ...prev, title: event.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(event) =>
              setNewBook((prev) => ({ ...prev, author: event.target.value }))
            }
          />
          <input
            type="number"
            placeholder="Year"
            value={newBook.year}
            onChange={(event) =>
              setNewBook((prev) => ({ ...prev, year: event.target.value }))
            }
          />
          <button type="submit" className="btn-primary">
            Suggest book
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddBookPage



