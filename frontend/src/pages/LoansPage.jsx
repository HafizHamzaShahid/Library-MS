import { useState } from 'react'
import { useLibrary } from '../context/LibraryContext'

function LoansPage() {
  const { loans, returnBook } = useLibrary()
  const [actionError, setActionError] = useState('')
  const [returningId, setReturningId] = useState(null)

  const handleReturn = async (loanId) => {
    try {
      setActionError('')
      setReturningId(loanId)
      await returnBook(loanId)
    } catch (err) {
      setActionError(err.message || 'Failed to return book')
    } finally {
      setReturningId(null)
    }
  }

  return (
    <div className="page">
      <h1>Books borrowed</h1>
      <p className="page-subtitle">
        Track the books you have borrowed and their due dates.
      </p>
      {actionError && <div className="alert alert-error">{actionError}</div>}
      <div className="table">
        <div className="table-header">
          <span>Title</span>
          <span>Due date</span>
          <span>Status</span>
          <span>Action</span>
        </div>
        {loans.map((loan) => (
          <div key={loan.id} className="table-row">
            <span>{loan.title}</span>
            <span>{loan.dueDate}</span>
            <span
              className={
                loan.status === 'Overdue'
                  ? 'badge badge-danger'
                  : 'badge badge-success'
              }
            >
              {loan.status}
            </span>
            <button
              type="button"
              className="btn-secondary btn-sm"
              onClick={() => handleReturn(loan.id)}
              disabled={returningId === loan.id}
            >
              {returningId === loan.id ? 'Returning...' : 'Return'}
            </button>
          </div>
        ))}
        {loans.length === 0 && (
          <div className="table-row">
            <span>No borrowed books</span>
            <span />
            <span />
            <span />
          </div>
        )}
      </div>
    </div>
  )
}

export default LoansPage


