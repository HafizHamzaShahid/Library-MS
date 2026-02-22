import { Link, NavLink, Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span role="img" aria-label="fashion">
            👗
          </span>
          <span>Fashion Shop</span>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/app/add-product">Add Product</NavLink>
          <NavLink to="/app/update-product">Update Product</NavLink>
          <NavLink to="/app/delete-product">Delete Product</NavLink>
          <NavLink to="/app/season-totals">Season Totals</NavLink>
          <NavLink to="/app/top-units">Top Units</NavLink>
          <NavLink to="/app/rating-condition">Rating Condition</NavLink>
        </nav>
      </aside>
      <div className="main-area">
        <header className="topbar" />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout

