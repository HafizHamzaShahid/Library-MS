import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth-page">
      <div className="auth-illustration">
        <h1>Umer Library</h1>
        <p>Discover, borrow, and manage your books in one modern online library.</p>
      </div>
      <div className="auth-panel">
        <div className="auth-header">
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div className="auth-body">{children}</div>
        <div className="auth-footer">
          <p>
            Need an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

AuthLayout.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default AuthLayout


