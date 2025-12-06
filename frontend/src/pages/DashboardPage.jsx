import { useAuth } from '../context/AuthContext'
import { useLibrary } from '../context/LibraryContext'

function DashboardPage() {
  const { user } = useAuth()
  const { stats } = useLibrary()

  return (
    <div className="page">
      <h1>Welcome, {user?.name}</h1>
      <p className="page-subtitle">
        This is your library overview. From here you can browse books and manage
        your loans.
      </p>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Books</h3>
          <p className="stat-number">{stats.totalBooks}</p>
        </div>
        <div className="stat-card">
          <h3>Books borrowed</h3>
          <p className="stat-number">{stats.borrowedCount}</p>
        </div>
        <div className="stat-card">
          <h3>Overdue</h3>
          <p className="stat-number stat-number--danger">
            {stats.overdueCount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage


