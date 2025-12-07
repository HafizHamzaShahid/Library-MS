import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
// import { AuthProvider } from './context/AuthContext' // Commented out - single user, no authentication needed
import { LibraryProvider } from './context/LibraryContext'
// import RequireAuth from './components/RequireAuth' // Commented out - single user, no authentication needed
import AppLayout from './layouts/AppLayout'
// import LoginPage from './pages/LoginPage' // Commented out - single user, no login needed
// import SignupPage from './pages/SignupPage' // Commented out - single user, no signup needed
import DashboardPage from './pages/DashboardPage'
import BooksPage from './pages/BooksPage'
import LoansPage from './pages/LoansPage'
import AddBookPage from './pages/AddBookPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      {/* <AuthProvider> */} {/* Commented out - single user, no authentication needed */}
        <LibraryProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/app" replace />} />
            {/* <Route path="/login" element={<LoginPage />} /> */} {/* Commented out - single user, no login needed */}
            {/* <Route path="/signup" element={<SignupPage />} /> */} {/* Commented out - single user, no signup needed */}

            {/* <Route element={<RequireAuth />}> */} {/* Commented out - single user, no authentication needed */}
              <Route path="/app" element={<AppLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="books" element={<BooksPage />} />
                <Route path="books/add" element={<AddBookPage />} />
                <Route path="loans" element={<LoansPage />} />
              </Route>
            {/* </Route> */} {/* Commented out - single user, no authentication needed */}

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </LibraryProvider>
      {/* </AuthProvider> */} {/* Commented out - single user, no authentication needed */}
    </BrowserRouter>
  )
}

export default App
