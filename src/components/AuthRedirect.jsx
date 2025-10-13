import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AuthRedirect = ({ children }) => {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated, navigate])

    // Si está autenticado, no mostrar el formulario (se redirigirá)
    if (isAuthenticated) {
        return null
    }

    // Si no está autenticado, mostrar el formulario
    return children
}

export default AuthRedirect
