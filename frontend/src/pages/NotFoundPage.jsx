import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="center-screen">
      <div className="card">
        <h1>404</h1>
        <p>We could not find the page you were looking for.</p>
        <Link to="/app" className="btn-primary">
          Go back home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage


