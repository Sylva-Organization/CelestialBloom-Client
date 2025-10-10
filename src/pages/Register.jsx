import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { formValidation, mockData, utils } from '../utils'
import './Register.css'

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    
    const { login } = useAuth()
    const navigate = useNavigate()

    // Log de inicialización del componente
    utils.devLog('Componente Register montado', 'info')

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
        
        utils.devLog(`Campo ${name} actualizado: ${name === 'password' || name === 'confirmPassword' ? '***' : value}`, 'debug')
    }

    const validateConfirmPassword = (password, confirmPassword) => {
        const isValid = password === confirmPassword
        utils.devLog(`Validando confirmación de contraseña: ${isValid ? 'válida' : 'inválida'}`, isValid ? 'success' : 'warning')
        return {
            isValid,
            message: isValid ? 'Las contraseñas coinciden' : 'Las contraseñas no coinciden'
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        utils.devLog('Formulario de registro enviado', 'info')
        
        // Validar formulario completo
        const validation = formValidation.validateRegisterForm(formData)
        const confirmPasswordValidation = validateConfirmPassword(formData.password, formData.confirmPassword)
        
        const allErrors = {}
        
        // Agregar errores de validación básica
        if (!validation.isValid) {
            validation.errors.forEach(field => {
                allErrors[field] = validation.results[field].message
            })
        }
        
        // Agregar error de confirmación de contraseña
        if (!confirmPasswordValidation.isValid) {
            allErrors.confirmPassword = confirmPasswordValidation.message
        }
        
        // Si hay errores, mostrarlos
        if (Object.keys(allErrors).length > 0) {
            utils.devLog('Formulario inválido', 'warning')
            setErrors(allErrors)
            return
        }

        setIsLoading(true)
        utils.devLog('Iniciando proceso de registro...', 'info')

        try {
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 1200))
            
            // Verificar si el usuario ya existe (simulado)
            const existingUser = mockData.getUserByEmail(formData.email)
            if (existingUser) {
                utils.devLog('Usuario ya existe en mock data', 'warning')
                setErrors({ email: 'Este email ya está registrado' })
                return
            }
            
            // Usar mock data para simular registro
            const mockResponse = mockData.mockRegisterSuccess({
                name: formData.name,
                email: formData.email
            })
            
            if (mockResponse.success) {
                utils.devLog('Registro exitoso con mock data', 'success')
                login(mockResponse.user)
                navigate('/')
            }
        } catch (error) {
            utils.devLog('Error en registro simulado', 'error')
            setErrors({ general: 'Error al crear la cuenta. Intenta nuevamente.' })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Crear Cuenta</h2>
                <p className="register-subtitle">Únete a la comunidad CelestialBloom</p>
                
                <form onSubmit={handleSubmit} className="register-form">
                    {errors.general && (
                        <div className="error-message general-error">
                            {errors.general}
                        </div>
                    )}
                    
                    <div className="form-group">
                        <label htmlFor="name">Nombre completo</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={errors.name ? 'error' : ''}
                            placeholder="Tu nombre completo"
                            required
                        />
                        {errors.name && (
                            <span className="error-message">{errors.name}</span>
                        )}
                    </div>
                    
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
                            placeholder="Mínimo 6 caracteres"
                            required
                        />
                        {errors.password && (
                            <span className="error-message">{errors.password}</span>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? 'error' : ''}
                            placeholder="Repite tu contraseña"
                            required
                        />
                        {errors.confirmPassword && (
                            <span className="error-message">{errors.confirmPassword}</span>
                        )}
                    </div>
                    
                    <button 
                        type="submit" 
                        className="register-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                    </button>
                </form>
                
                <div className="register-footer">
                    <p>¿Ya tienes cuenta? <a href="/signin">Inicia sesión aquí</a></p>
                </div>
                
                <div className="mock-info">
                    <p><strong>Demo:</strong> Todos los datos son simulados. No se envía información real.</p>
                </div>
            </div>
        </div>
    )
}

export default Register