import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function AppLayout() {
  const { user, logout } = useAuth()

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span role="img" aria-label="books">
            📚
          </span>
          <span>Library</span>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/app" end>
            Dashboard
          </NavLink>
          <NavLink to="/app/books" end>
            Browse Books
          </NavLink>
          <NavLink to="/app/books/add">Suggest Book</NavLink>
          <NavLink to="/app/loans">Books borrowed</NavLink>
        </nav>
      </aside>
      <div className="main-area">
        <header className="topbar">
          <div className="breadcrumbs">
            <Link to="/app">Home</Link>
          </div>
          <div className="topbar-right">
            <span className="user-pill">{user?.name}</span>
            <button type="button" className="btn-secondary" onClick={logout}>
              Logout
            </button>
          </div>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout


