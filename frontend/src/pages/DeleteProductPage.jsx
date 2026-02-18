import { useState } from 'react'
import { fashionApi } from '../services/api'

function DeleteProductPage() {
  const [productName, setProductName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!productName.trim()) {
      setError('Product Name is required to delete a record.')
      return
    }

    try {
      setLoading(true)
      await fashionApi.deleteProduct(productName.trim())
      setSuccess('Product deleted successfully (if it existed).')
      setProductName('')
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to delete product.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <h1>Delete Fashion Product</h1>
      <p className="page-subtitle">
        Remove a record for a given Product Name from FashionShopData (Task 2.4 / 1.7).
      </p>
      <form className="book-form" onSubmit={handleSubmit}>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <div className="book-form-row">
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
            disabled={loading}
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Deleting...' : 'Delete Product'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default DeleteProductPage


