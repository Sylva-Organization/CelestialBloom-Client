import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Store global de autenticación con Zustand
const useAuthStore = create(
  persist(
    (set, get) => ({
      // 🔐 Estado de autenticación
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      
      // 🚀 Acciones de autenticación
      login: (userData, token = null) => {
        console.log('🔐 Login exitoso:', userData)
        set({ 
          user: userData, 
          token: token,
          isAuthenticated: true, 
          isLoading: false 
        })
      },
      
      logout: () => {
        console.log('🚪 Logout realizado')
        set({ 
          user: null, 
          token: null,
          isAuthenticated: false, 
          isLoading: false 
        })
      },
      
      register: (userData, token = null) => {
        console.log('📝 Registro exitoso:', userData)
        set({ 
          user: userData, 
          token: token,
          isAuthenticated: true, 
          isLoading: false 
        })
      },
      
      setLoading: (loading) => {
        console.log('⏳ Loading state:', loading)
        set({ isLoading: loading })
      },
      
      updateUser: (updatedData) => {
        const currentUser = get().user
        const newUser = { ...currentUser, ...updatedData }
        console.log('👤 Usuario actualizado:', newUser)
        set({ user: newUser })
      },
      
      // 🔍 Helpers y getters
      getUser: () => get().user,
      isLoggedIn: () => get().isAuthenticated,
      getUserName: () => {
        const user = get().user
        if (user?.firstName && user?.lastName) {
          return `${user.firstName} ${user.lastName}`
        }
        return user?.username || user?.email || 'Usuario'
      },
      
      // 🛡️ Funciones de verificación de acceso
      checkAuth: () => {
        const { user, isAuthenticated } = get()
        return user && isAuthenticated
      },
      
      // 🔐 Verificar si el usuario puede acceder a una ruta protegida
      canAccessProtectedRoute: () => {
        return get().isAuthenticated && get().user
      },
      
      // 👤 Verificar roles del usuario (para futuras implementaciones)
      hasRole: (role) => {
        const user = get().user
        return user?.roles?.includes(role) || false
      },
      
      // 📧 Verificar si el email está verificado (mock)
      isEmailVerified: () => {
        const user = get().user
        return user?.emailVerified || true // Por defecto true en mock
      },
      
      // ⏰ Verificar si el token ha expirado
      isTokenValid: () => {
        const token = get().token
        if (!token) return false
        
        // Importar dinámicamente para evitar dependencias circulares
        import('../services/UsersServices').then(({ isTokenValid }) => {
          return isTokenValid(token)
        }).catch(() => false)
        
        // Verificación básica mientras tanto
        try {
          const parts = token.split('.')
          if (parts.length !== 3) return false
          
          const payload = JSON.parse(atob(parts[1]))
          return payload.exp ? payload.exp > Math.floor(Date.now() / 1000) : true
        } catch {
          return false
        }
      },
      
      // 🔄 Renovar sesión automáticamente
      refreshAuth: async () => {
        const { user, token } = get()
        if (user && token && get().isTokenValid()) {
          console.log('🔄 Sesión renovada automáticamente')
          return true
        }
        return false
      },
      
      // 🔑 Manejo de tokens
      setToken: (token) => {
        console.log('🔑 Token establecido')
        set({ token })
      },
      
      clearToken: () => {
        console.log('🗑️ Token eliminado')
        set({ token: null })
      },
      
      // 🧹 Limpiar estado (útil para desarrollo)
      clearAuth: () => {
        console.log('🧹 Limpiando estado de autenticación')
        set({ 
          user: null, 
          token: null,
          isAuthenticated: false, 
          isLoading: false 
        })
      }
    }),
    {
      name: 'celestial-auth-storage', // Clave en localStorage
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token,
        isAuthenticated: state.isAuthenticated 
      }),
      // Configuración de persistencia
      version: 1,
      migrate: (persistedState, version) => {
        // Migración para versiones futuras si es necesario
        return persistedState
      }
    }
  )
)

export default useAuthStore
