import { useState } from 'react'
import { fashionApi } from '../services/api'

function AddProductPage() {
  const [form, setForm] = useState({
    productCategory: '',
    productName: '',
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

    // Basic front-end validation
    const requiredFields = Object.entries(form).every(
      ([, value]) => String(value).trim() !== '',
    )
    if (!requiredFields) {
      setError('Please fill in all 9 fields.')
      return
    }

    try {
      setLoading(true)
      await fashionApi.addProduct({
        ...form,
        unitsSold: Number(form.unitsSold),
        returns: Number(form.returns),
        revenue: Number(form.revenue),
        customerRating: Number(form.customerRating),
        stockLevel: Number(form.stockLevel),
        trendScore: Number(form.trendScore),
      })
      setSuccess('Product added successfully to FashionShopData.')
      setForm({
        productCategory: '',
        productName: '',
        unitsSold: '',
        returns: '',
        revenue: '',
        customerRating: '',
        stockLevel: '',
        season: '',
        trendScore: '',
      })
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to add product.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <h1>Add Fashion Product</h1>
      <p className="page-subtitle">
         (Task 2.1 / 1.5).
      </p>
      <form className="book-form" onSubmit={handleSubmit}>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <div className="book-form-row">
          <input
            name="productCategory"
            type="text"
            placeholder="Product Category"
            value={form.productCategory}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            name="productName"
            type="text"
            placeholder="Product Name"
            value={form.productName}
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
            placeholder="Customer Rating (0-5)"
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
            placeholder="Season (e.g. Summer)"
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
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProductPage


