import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { formValidation, mockData, utils } from '../utils'
import './SignIn.css'

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    
    const { login } = useAuth()
    const navigate = useNavigate()

    // Log de inicialización del componente
    utils.devLog('Componente SignIn montado', 'info')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        
        // Limpiar error específico cuando el usuario escribe
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }))
        }
        
        utils.devLog(`Campo ${name} actualizado: ${value}`, 'debug')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        utils.devLog('Formulario de login enviado', 'info')
        
        // Validar formulario
        const validation = formValidation.validateLoginForm(formData)
        
        if (!validation.isValid) {
            utils.devLog('Formulario inválido', 'warning')
            const newErrors = {}
            validation.errors.forEach(field => {
                newErrors[field] = validation.results[field].message
            })
            setErrors(newErrors)
            return
        }

        setIsLoading(true)
        utils.devLog('Iniciando proceso de login...', 'info')

        try {
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            // Usar mock data para simular login
            const mockResponse = mockData.mockLoginSuccess(formData.email)
            
            if (mockResponse.success) {
                utils.devLog('Login exitoso con mock data', 'success')
                login(mockResponse.user)
                navigate('/')
            }
        } catch (error) {
            utils.devLog('Error en login simulado', 'error')
            setErrors({ general: 'Error al iniciar sesión. Intenta nuevamente.' })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="signin-container">
            <div className="signin-card">
                <h2>Iniciar Sesión</h2>
                <p className="signin-subtitle">Accede a tu cuenta de CelestialBloom</p>
                
                <form onSubmit={handleSubmit} className="signin-form">
                    {errors.general && (
                        <div className="error-message general-error">
                            {errors.general}
                        </div>
                    )}
                    
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                            placeholder="tu@email.com"
                            required
                        />
                        {errors.email && (
                            <span className="error-message">{errors.email}</span>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'error' : ''}
                            placeholder="Tu contraseña"
                            required
                        />
                        {errors.password && (
                            <span className="error-message">{errors.password}</span>
                        )}
                    </div>
                    
                    <button 
                        type="submit" 
                        className="signin-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>
                
                <div className="signin-footer">
                    <p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
                </div>
                
                <div className="mock-info">
                    <p><strong>Demo:</strong> Usa cualquier email válido para probar</p>
                </div>
            </div>
        </div>
    )
}

export default SignIn