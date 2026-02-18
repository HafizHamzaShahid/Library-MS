import { useState } from 'react'
import { fashionApi } from '../services/api'

function RatingConditionPage() {
  const [season, setSeason] = useState('')
  const [operator, setOperator] = useState('gte')
  const [value, setValue] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setResult(null)

    if (!season.trim() || !value) {
      setError('Please enter both season and rating value.')
      return
    }

    try {
      setLoading(true)
      const data = await fashionApi.getRatingCondition({
        season: season.trim(),
        operator,
        value: Number(value),
      })
      setResult(data)
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Failed to load rating condition data.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <h1>Average Rating Condition</h1>
      <p className="page-subtitle">
        Display all products for a season where the average Customer Rating meets a condition
        (Task 2.6 / 1.10).
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
          <select
            value={operator}
            onChange={(event) => setOperator(event.target.value)}
            disabled={loading}
          >
            <option value="gte">Average ≥ value</option>
            <option value="gt">Average &gt; value</option>
            <option value="lte">Average ≤ value</option>
            <option value="lt">Average &lt; value</option>
          </select>
          <input
            type="number"
            step="0.1"
            placeholder="Rating value"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            disabled={loading}
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Loading...' : 'Check Condition'}
          </button>
        </div>
      </form>

      {result && (
        <>
          <div className="stats-grid" style={{ marginTop: '1.5rem' }}>
            <div className="stat-card">
              <h3>Season</h3>
              <p className="stat-number">{result.season}</p>
            </div>
            <div className="stat-card">
              <h3>Average Rating</h3>
              <p className="stat-number">{result.averageCustomerRating?.toFixed(2)}</p>
            </div>
            <div className="stat-card">
              <h3>Condition Met</h3>
              <p className="stat-number">
                {result.conditionMet ? 'Yes — products shown below' : 'No — no products listed'}
              </p>
            </div>
          </div>

          <div className="table" style={{ marginTop: '1.5rem' }}>
            <div className="table-header">
              <span>Product Name</span>
              <span>Category</span>
              <span>Customer Rating</span>
              <span>Season</span>
            </div>
            {(result.products || []).map((item) => (
              <div key={item._id || item.productName} className="table-row">
                <span>{item.productName}</span>
                <span>{item.productCategory}</span>
                <span>{item.customerRating}</span>
                <span>{item.season}</span>
              </div>
            ))}
            {!loading && (!result.products || result.products.length === 0) && (
              <div className="table-row">
                <span>No products match this condition.</span>
                <span />
                <span />
                <span />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default RatingConditionPage


