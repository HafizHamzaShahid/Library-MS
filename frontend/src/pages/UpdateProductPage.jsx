import { useState } from 'react'
import { fashionApi } from '../services/api'

function UpdateProductPage() {
  const [form, setForm] = useState({
    productName: '',
    productCategory: '',
    unitsSold: '',
    returns: '',
    revenue: '',
    customerRating: '',
    stockLevel: '',
    season: '',
    trendScore: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!form.productName.trim()) {
      setError('Product Name is required to update a record.')
      return
    }

    const payload = { productName: form.productName.trim() }
    ;['productCategory', 'unitsSold', 'returns', 'revenue', 'customerRating', 'stockLevel', 'season', 'trendScore'].forEach(
      (field) => {
        const value = form[field]
        if (String(value).trim() !== '') {
          if (['unitsSold', 'returns', 'revenue', 'customerRating', 'stockLevel', 'trendScore'].includes(field)) {
            payload[field] = Number(value)
          } else {
            payload[field] = value
          }
        }
      },
    )

    try {
      setLoading(true)
      await fashionApi.updateProduct(payload)
      setSuccess('Product updated successfully.')
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update product.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <h1>Update Fashion Product</h1>
      <p className="page-subtitle">
         (Task 2.2 / 1.6).
      </p>
      <form className="book-form" onSubmit={handleSubmit}>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <div className="book-form-row">
          <input
            name="productName"
            type="text"
            placeholder="Product Name (required)"
            value={form.productName}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            name="productCategory"
            type="text"
            placeholder="Product Category"
            value={form.productCategory}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            name="unitsSold"
            type="number"
            placeholder="Units Sold"
            value={form.unitsSold}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            name="returns"
            type="number"
            placeholder="Returns"
            value={form.returns}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            name="revenue"
            type="number"
            placeholder="Revenue"
            value={form.revenue}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            name="customerRating"
            type="number"
            step="0.1"
            placeholder="Customer Rating"
            value={form.customerRating}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            name="stockLevel"
            type="number"
            placeholder="Stock Level"
            value={form.stockLevel}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            name="season"
            type="text"
            placeholder="Season"
            value={form.season}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            name="trendScore"
            type="number"
            placeholder="Trend Score"
            value={form.trendScore}
            onChange={handleChange}
            disabled={loading}
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Updating...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProductPage


