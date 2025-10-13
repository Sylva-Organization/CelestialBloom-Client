import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    // Verificar si hay una sesión guardada al cargar la aplicación
    useEffect(() => {
        const savedUser = localStorage.getItem('celestialbloom_user')
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser)
                setUser(parsedUser)
            } catch (error) {
                console.error('Error parsing saved user:', error)
                localStorage.removeItem('celestialbloom_user')
            }
        }
        setIsLoading(false)
    }, [])

    const login = (userData) => {
        setUser(userData)
        localStorage.setItem('celestialbloom_user', JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('celestialbloom_user')
    }

    const register = (userData) => {
        // Al registrarse, también inicia sesión automáticamente
        const userWithId = {
            ...userData,
            id: Date.now(), // ID temporal para demo
            createdAt: new Date().toISOString()
        }
        setUser(userWithId)
        localStorage.setItem('celestialbloom_user', JSON.stringify(userWithId))
    }

    const value = {
        user,
        isLoading,
        login,
        logout,
        register,
        isAuthenticated: !!user
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
