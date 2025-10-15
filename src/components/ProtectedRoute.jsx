import { Navigate } from 'react-router-dom'
import useAuthStore from '../stores/authStore'
import { useEffect } from 'react'

const ProtectedRoute = ({ children, requiresEmailVerification = false, requiredRole = null }) => {
    const { 
        canAccessProtectedRoute, 
        isEmailVerified, 
        hasRole, 
        refreshAuth,
        getUserName 
    } = useAuthStore()
    
    // 🔄 Intentar renovar la autenticación al cargar
    useEffect(() => {
        refreshAuth()
    }, [refreshAuth])
    
    // 🛡️ Verificación básica de autenticación
    if (!canAccessProtectedRoute()) {
        console.log('🚫 Acceso denegado: Usuario no autenticado')
        return <Navigate to="/inicio-sesion" replace />
    }
    
    // 📧 Verificación de email (opcional)
    if (requiresEmailVerification && !isEmailVerified()) {
        console.log('🚫 Acceso denegado: Email no verificado')
        return <Navigate to="/verificar-email" replace />
    }
    
    // 👤 Verificación de rol (opcional)
    if (requiredRole && !hasRole(requiredRole)) {
        console.log(`🚫 Acceso denegado: Rol ${requiredRole} requerido`)
        return <Navigate to="/sin-permisos" replace />
    }
    
    console.log(`✅ Acceso permitido para: ${getUserName()}`)
    // ✅ Si todas las verificaciones pasan, mostrar el contenido
    return children
}

export default ProtectedRoute