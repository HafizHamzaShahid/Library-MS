import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import { LibraryProvider } from './context/LibraryContext'
import RequireAuth from './components/RequireAuth'
import AppLayout from './layouts/AppLayout'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import BooksPage from './pages/BooksPage'
import LoansPage from './pages/LoansPage'
import AddBookPage from './pages/AddBookPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LibraryProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route element={<RequireAuth />}>
              <Route path="/app" element={<AppLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="books" element={<BooksPage />} />
                <Route path="books/add" element={<AddBookPage />} />
                <Route path="loans" element={<LoansPage />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </LibraryProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
