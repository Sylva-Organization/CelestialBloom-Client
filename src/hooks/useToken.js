import { useEffect, useState } from 'react'
import { verifyToken, isTokenValid } from '../services/UsersServices'

/**
 * Hook personalizado para manejar tokens de autenticación
 */
export const useToken = () => {
    const [token, setTokenState] = useState(() => {
        return localStorage.getItem('celestialbloom_token')
    })
    const [isValid, setIsValid] = useState(false)
    const [payload, setPayload] = useState(null)

    // Verificar token cuando cambie
    useEffect(() => {
        if (token) {
            const tokenPayload = verifyToken(token)
            setPayload(tokenPayload)
            setIsValid(tokenPayload !== null)
            
            if (!tokenPayload) {
                // Token inválido, limpiar
                removeToken()
            }
        } else {
            setPayload(null)
            setIsValid(false)
        }
    }, [token])

    const setToken = (newToken) => {
        if (newToken) {
            localStorage.setItem('celestialbloom_token', newToken)
            setTokenState(newToken)
        }
    }

    const removeToken = () => {
        localStorage.removeItem('celestialbloom_token')
        setTokenState(null)
    }

    const refreshToken = () => {
        const storedToken = localStorage.getItem('celestialbloom_token')
        setTokenState(storedToken)
    }

    return {
        token,
        isValid,
        payload,
        setToken,
        removeToken,
        refreshToken,
        isTokenValid: (tokenToCheck) => isTokenValid(tokenToCheck || token)
    }
}

export default useToken
