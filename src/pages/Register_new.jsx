import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthActions } from '../hooks/useAuthActions'
import { formValidation, mockData, utils } from '../utils'
import './Register.css'

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    
    // 🎣 Usar hook personalizado para autenticación
    const { handleRegister, isLoading, setLoading } = useAuthActions()
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
        
        utils.devLog(`Campo ${name} actualizado: ${value}`, 'debug')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        utils.devLog('Formulario de registro enviado', 'info')
        
        // Validar formulario completo
        const validation = formValidation.validateRegisterForm(formData)
        
        if (!validation.isValid) {
            utils.devLog('Formulario inválido', 'warning')
            const newErrors = {}
            validation.errors.forEach(field => {
                newErrors[field] = validation.results[field].message
            })
            setErrors(newErrors)
            return
        }

        setLoading(true)
        utils.devLog('Iniciando proceso de registro...', 'info')

        try {
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 1500))
            
            // Verificar si el usuario ya existe (simulado)
            const existingUser = mockData.getUserByEmail(formData.email)
            if (existingUser) {
                utils.devLog('Usuario ya existe en mock data', 'warning')
                setErrors({ email: 'Este email ya está registrado' })
                return
            }
            
            // Usar mock data para simular registro
            const mockResponse = mockData.mockRegisterSuccess({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                username: formData.username
            })
            
            if (mockResponse.success) {
                utils.devLog('Registro exitoso con mock data', 'success')
                
                // 🔑 Simular token JWT
                const mockToken = `jwt.token.${Date.now()}.${Math.random().toString(36).substr(2, 9)}`
                
                // 🎉 Usar hook mejorado para registro
                await handleRegister(mockResponse.user, mockToken, '/')
            }
        } catch (error) {
            utils.devLog('Error en registro simulado', 'error')
            setErrors({ general: 'Error al crear la cuenta. Intenta nuevamente.' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Crear tu cuenta</h2>
                <p className="register-subtitle">¿Ya tienes una cuenta? <button onClick={() => navigate('/inicio-sesion')} className="signin-link">Iniciar sesión</button></p>
                
                <form onSubmit={handleSubmit} className="register-form">
                    {errors.general && (
                        <div className="error-message general-error">
                            {errors.general}
                        </div>
                    )}
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">Nombre</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={errors.firstName ? 'error' : ''}
                                placeholder="Tu nombre"
                                required
                            />
                            {errors.firstName && (
                                <span className="error-message">{errors.firstName}</span>
                            )}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="lastName">Apellido</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={errors.lastName ? 'error' : ''}
                                placeholder="Tu apellido"
                                required
                            />
                            {errors.lastName && (
                                <span className="error-message">{errors.lastName}</span>
                            )}
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                            placeholder="tu-email@ejemplo.com"
                            required
                        />
                        {errors.email && (
                            <span className="error-message">{errors.email}</span>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="username">Usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={errors.username ? 'error' : ''}
                            placeholder="Elige tu nombre de usuario"
                            required
                        />
                        <small className="input-help">2-20 caracteres, solo letras, números y guión bajo</small>
                        {errors.username && (
                            <span className="error-message">{errors.username}</span>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={errors.password ? 'error' : ''}
                                placeholder="Crea una contraseña segura"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                        <small className="input-help">Mínimo 8 caracteres, incluye mayúsculas, minúsculas y números</small>
                        {errors.password && (
                            <span className="error-message">{errors.password}</span>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        className="register-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register
