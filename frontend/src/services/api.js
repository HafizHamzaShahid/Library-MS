import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000',
})

// Fashion shop REST API helpers
export const fashionApi = {
  // 2.1 - Add product (all 9 fields)
  async addProduct(payload) {
    const response = await api.post('/fashion/add-product', payload)
    return response.data
  },

  // 2.2 - Update product by Product Name
  async updateProduct(payload) {
    const response = await api.post('/fashion/update-product', payload)
    return response.data
  },

  // 2.4 - Delete product by Product Name
  async deleteProduct(productName) {
    const response = await api.post('/fashion/delete-product', { productName })
    return response.data
  },

  // 2.3 - Season totals
  async getSeasonTotals(season) {
    const response = await api.get('/fashion/season-totals', { params: { season } })
    return response.data
  },

  // 2.5 - First 10 records where Units Sold > value for a season
  async getTopUnits({ season, minUnits }) {
    const response = await api.get('/fashion/top-units', { params: { season, minUnits } })
    return response.data
  },

  // 2.6 - Products where average rating by season meets condition
  async getRatingCondition({ season, operator, value }) {
    const response = await api.get('/fashion/rating-condition', {
      params: { season, operator, value },
    })
    return response.data
  },
}

export default api


