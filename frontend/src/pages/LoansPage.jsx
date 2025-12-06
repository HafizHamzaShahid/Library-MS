import { useLibrary } from '../context/LibraryContext'

function LoansPage() {
  const { loans } = useLibrary()

  return (
    <div className="page">
      <h1>Books borrowed</h1>
      <p className="page-subtitle">
        Track the books you have borrowed and their due dates.
      </p>
      <div className="table">
        <div className="table-header">
          <span>Title</span>
          <span>Due date</span>
          <span>Status</span>
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
          </div>
        ))}
      </div>
    </div>
  )
}

export default LoansPage


