// app/lib/auth.ts

const USER_KEY = 'btg_user'

// LOGIN
export const login = (email: string) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(USER_KEY, email)
}

// LOGOUT
export const logout = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(USER_KEY)
}

// CHECK LOGIN
export const getUser = () => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(USER_KEY)
}

// BOOLEAN CHECK
export const isLoggedIn = () => {
  return !!getUser()
}
