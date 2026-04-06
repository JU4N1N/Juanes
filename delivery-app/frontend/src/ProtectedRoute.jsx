import { Navigate } from 'react-router-dom'
import { isAuthenticated } from './utils/auth'

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />  // redirige si no está logueado
  }
  return children  // deja pasar si sí está logueado
}

export default ProtectedRoute