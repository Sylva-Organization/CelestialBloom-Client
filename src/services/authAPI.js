/**
 * Interceptor HTTP para manejar automáticamente los tokens de autorización
 */

const API_BASE_URL = 'http://localhost:3000'

/**
 * Wrapper para fetch que incluye automáticamente el token de autorización
 */
export const authenticatedFetch = async (url, options = {}) => {
    // Obtener token del localStorage
    const token = localStorage.getItem('celestialbloom_token')
    
    // Configurar headers por defecto
    const defaultHeaders = {
        'Content-Type': 'application/json',
        ...options.headers
    }
    
    // Agregar token si existe
    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`
    }
    
    // Construir URL completa si es relativa
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`
    
    try {
        const response = await fetch(fullUrl, {
            ...options,
            headers: defaultHeaders
        })
        
        // Si recibimos 401, el token probablemente expiró
        if (response.status === 401) {
            localStorage.removeItem('celestialbloom_token')
            localStorage.removeItem('celestialbloom_user')
            
            // Opcional: redirigir al login
            if (window.location.pathname !== '/inicio-sesion') {
                window.location.href = '/inicio-sesion'
            }
        }
        
        return response
    } catch (error) {
        console.error('Error en request autenticado:', error)
        throw error
    }
}

/**
 * Helper methods para diferentes tipos de requests
 */
export const authAPI = {
    get: (url, options = {}) => authenticatedFetch(url, { 
        ...options, 
        method: 'GET' 
    }),
    
    post: (url, data, options = {}) => authenticatedFetch(url, { 
        ...options, 
        method: 'POST',
        body: JSON.stringify(data)
    }),
    
    put: (url, data, options = {}) => authenticatedFetch(url, { 
        ...options, 
        method: 'PUT',
        body: JSON.stringify(data)
    }),
    
    delete: (url, options = {}) => authenticatedFetch(url, { 
        ...options, 
        method: 'DELETE' 
    }),
    
    patch: (url, data, options = {}) => authenticatedFetch(url, { 
        ...options, 
        method: 'PATCH',
        body: JSON.stringify(data)
    })
}

export default authAPI
