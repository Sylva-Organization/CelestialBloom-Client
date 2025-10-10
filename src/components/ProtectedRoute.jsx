import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth()
    
    // Si no está autenticado, redirigir al login
    if (!isAuthenticated) {
        return <Navigate to="/inicio-sesion" replace />
    }
    
    // Si está autenticado, mostrar el contenido
    return children
}

export default ProtectedRoute