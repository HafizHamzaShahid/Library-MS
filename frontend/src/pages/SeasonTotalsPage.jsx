import { useState } from 'react'
import { fashionApi } from '../services/api'

function SeasonTotalsPage() {
  const [season, setSeason] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setResult(null)

    if (!season.trim()) {
      setError('Please enter a season.')
      return
    }

    try {
      setLoading(true)
      const data = await fashionApi.getSeasonTotals(season.trim())
      setResult(data)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load season totals.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <h1>Season Totals</h1>
      <p className="page-subtitle">
         (Task 2.3 / 1.8).
      </p>
      <form className="book-form" onSubmit={handleSubmit}>
        {error && <div className="alert alert-error">{error}</div>}
        <div className="book-form-row">
          <input
            type="text"
            placeholder="Season (e.g. Summer)"
            value={season}
            onChange={(event) => setSeason(event.target.value)}
            disabled={loading}
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Loading...' : 'Show Totals'}
          </button>
        </div>
      </form>
      {result && (
        <div className="stats-grid" style={{ marginTop: '1.5rem' }}>
          <div className="stat-card">
            <h3>Season</h3>
            <p className="stat-number">{result.season}</p>
          </div>
          <div className="stat-card">
            <h3>Total Units Sold</h3>
            <p className="stat-number">{result.totalUnitsSold}</p>
          </div>
          <div className="stat-card">
            <h3>Total Returns</h3>
            <p className="stat-number">{result.totalReturns}</p>
          </div>
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <p className="stat-number">{result.totalRevenue}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default SeasonTotalsPage


