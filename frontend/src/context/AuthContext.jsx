import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { authApi } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    const stored = window.localStorage.getItem('library_auth')
    if (stored) {
      const parsed = JSON.parse(stored)
      setUser(parsed.user)
      setToken(parsed.token)
    }
    setInitializing(false)
  }, [])

  const login = async (credentials) => {
    const res = await authApi.login(credentials)
    const { user: loggedInUser, token: jwt } = res.data
    setUser(loggedInUser)
    setToken(jwt)
    window.localStorage.setItem(
      'library_auth',
      JSON.stringify({ user: loggedInUser, token: jwt }),
    )
  }

  const signup = async (payload) => {
    const res = await authApi.signup(payload)
    const { user: createdUser, token: jwt } = res.data
    setUser(createdUser)
    setToken(jwt)
    window.localStorage.setItem(
      'library_auth',
      JSON.stringify({ user: createdUser, token: jwt }),
    )
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    window.localStorage.removeItem('library_auth')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        initializing,
        login,
        signup,
        logout,
        isAuthenticated: Boolean(user && token),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}


