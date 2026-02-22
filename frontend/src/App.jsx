import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/AppLayout'
import DashboardPage from './pages/DashboardPage'
import AddProductPage from './pages/AddProductPage'
import UpdateProductPage from './pages/UpdateProductPage'
import DeleteProductPage from './pages/DeleteProductPage'
import SeasonTotalsPage from './pages/SeasonTotalsPage'
import TopUnitsPage from './pages/TopUnitsPage'
import RatingConditionPage from './pages/RatingConditionPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/app/add-product" replace />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="add-product" element={<AddProductPage />} />
          <Route path="update-product" element={<UpdateProductPage />} />
          <Route path="delete-product" element={<DeleteProductPage />} />
          <Route path="season-totals" element={<SeasonTotalsPage />} />
          <Route path="top-units" element={<TopUnitsPage />} />
          <Route path="rating-condition" element={<RatingConditionPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
