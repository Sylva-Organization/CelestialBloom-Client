import { useCallback } from 'react'
import useAuthStore from '../stores/authStore'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

/**
 * Hook personalizado que proporciona acciones de autenticación
 * y verificaciones de permisos de manera reactiva
 */
export const useAuthActions = () => {
    const navigate = useNavigate()
    
    // 🏪 Obtener todas las funciones del store
    const {
        // Estado
        user,
        isAuthenticated,
        isLoading,
        token,
        
        // Acciones básicas
        login,
        logout,
        register,
        setLoading,
        setToken,
        clearToken,
        
        // Verificaciones
        checkAuth,
        canAccessProtectedRoute,
        hasRole,
        isEmailVerified,
        isTokenValid,
        refreshAuth,
        
        // Getters
        getUser,
        getUserName,
        isLoggedIn
    } = useAuthStore()

    // 🚪 Logout mejorado con confirmación
    const handleLogout = useCallback(async () => {
        const result = await Swal.fire({
            title: '¿Cerrar sesión?',
            text: '¿Estás seguro de que quieres cerrar tu sesión?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#47b89d',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        })

        if (result.isConfirmed) {
            logout()
            clearToken()
            
            await Swal.fire({
                title: '¡Hasta pronto!',
                text: `Nos vemos pronto, ${getUserName()}`,
                icon: 'success',
                confirmButtonColor: '#47b89d',
                timer: 2000,
                showConfirmButton: false
            })
            
            navigate('/')
        }
    }, [logout, clearToken, getUserName, navigate])

    // 🔐 Login mejorado con navegación automática
    const handleLogin = useCallback(async (userData, token = null, redirectPath = '/') => {
        try {
            login(userData, token)
            if (token) setToken(token)
            
            await Swal.fire({
                icon: 'success',
                title: `¡Bienvenid@ de vuelta, ${userData.firstName}! 🌟`,
                text: 'Has iniciado sesión exitosamente',
                confirmButtonColor: '#47b89d',
                timer: 2000,
                showConfirmButton: false
            })
            
            navigate(redirectPath)
        } catch (error) {
            console.error('Error en login:', error)
            Swal.fire({
                icon: 'error',
                title: 'Error de autenticación',
                text: 'No se pudo iniciar sesión. Intenta nuevamente.',
                confirmButtonColor: '#47b89d'
            })
        }
    }, [login, setToken, navigate])

    // 📝 Registro mejorado
    const handleRegister = useCallback(async (userData, token = null, redirectPath = '/') => {
        try {
            register(userData, token)
            if (token) setToken(token)
            
            await Swal.fire({
                icon: 'success',
                title: `¡Bienvenid@ a CelestialBloom, ${userData.firstName}! 🌟`,
                text: 'Tu cuenta ha sido creada exitosamente',
                confirmButtonColor: '#47b89d',
                timer: 3000,
                showConfirmButton: false
            })
            
            navigate(redirectPath)
        } catch (error) {
            console.error('Error en registro:', error)
            Swal.fire({
                icon: 'error',
                title: 'Error en el registro',
                text: 'No se pudo crear la cuenta. Intenta nuevamente.',
                confirmButtonColor: '#47b89d'
            })
        }
    }, [register, setToken, navigate])

    // 🛡️ Verificar acceso a ruta
    const requireAuth = useCallback((redirectTo = '/inicio-sesion') => {
        if (!canAccessProtectedRoute()) {
            navigate(redirectTo)
            return false
        }
        return true
    }, [canAccessProtectedRoute, navigate])

    // 👤 Verificar rol específico
    const requireRole = useCallback((role, redirectTo = '/sin-permisos') => {
        if (!hasRole(role)) {
            navigate(redirectTo)
            return false
        }
        return true
    }, [hasRole, navigate])

    return {
        // Estado
        user,
        isAuthenticated,
        isLoading,
        token,
        
        // Acciones mejoradas
        handleLogin,
        handleLogout,
        handleRegister,
        
        // Verificaciones
        checkAuth,
        canAccessProtectedRoute,
        hasRole,
        isEmailVerified,
        isTokenValid,
        refreshAuth,
        requireAuth,
        requireRole,
        
        // Getters
        getUser,
        getUserName,
        isLoggedIn,
        
        // Acciones básicas (por si se necesitan)
        login,
        logout,
        register,
        setLoading,
        setToken,
        clearToken
    }
}

export default useAuthActions
