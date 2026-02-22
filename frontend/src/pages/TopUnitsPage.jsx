import { useState } from 'react'
import { fashionApi } from '../services/api'

function TopUnitsPage() {
  const [season, setSeason] = useState('')
  const [minUnits, setMinUnits] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setResults([])

    if (!season.trim() || !minUnits) {
      setError('Please enter both season and minimum units sold.')
      return
    }

    try {
      setLoading(true)
      const data = await fashionApi.getTopUnits({
        season: season.trim(),
        minUnits: Number(minUnits),
      })
      setResults(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load records.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <h1>Top Selling Products</h1>
      <p className="page-subtitle">
        
        (Task 2.5 / 1.9).
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
          <input
            type="number"
            placeholder="Minimum Units Sold"
            value={minUnits}
            onChange={(event) => setMinUnits(event.target.value)}
            disabled={loading}
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Loading...' : 'Show Products'}
          </button>
        </div>
      </form>

      <div className="table" style={{ marginTop: '1.5rem' }}>
        <div className="table-header">
          <span>Product Name</span>
          <span>Category</span>
          <span>Units Sold</span>
          <span>Season</span>
        </div>
        {results.map((item) => (
          <div key={item._id || item.productName} className="table-row">
            <span>{item.productName}</span>
            <span>{item.productCategory}</span>
            <span>{item.unitsSold}</span>
            <span>{item.season}</span>
          </div>
        ))}
        {!loading && results.length === 0 && (
          <div className="table-row">
            <span>No records to display.</span>
            <span />
            <span />
            <span />
          </div>
        )}
      </div>
    </div>
  )
}

export default TopUnitsPage


