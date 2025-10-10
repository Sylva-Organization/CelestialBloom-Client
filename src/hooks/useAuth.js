import { useState, useEffect } from 'react'

// Hook ultra-simple para manejar autenticación
export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        // Verificar si hay un usuario logueado al cargar
        const user = localStorage.getItem('celestial_user')
        setIsAuthenticated(!!user)
    }, [])

    const login = (userData) => {
        localStorage.setItem('celestial_user', JSON.stringify(userData))
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem('celestial_user')
        setIsAuthenticated(false)
    }

    const getUser = () => {
        const user = localStorage.getItem('celestial_user')
        return user ? JSON.parse(user) : null
    }

    return { isAuthenticated, login, logout, getUser }
}
