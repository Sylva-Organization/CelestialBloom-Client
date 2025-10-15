import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthActions } from '../hooks/useAuthActions'
import { formValidation, mockData, utils } from '../utils'
import Swal from 'sweetalert2'
import './SignIn.css'
import { useAuth } from '../context/AuthContext'

const SignIn = () => {
    const navigate = useNavigate()
    const { login } = useAuth()
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    
    // � Usar hook personalizado para autenticación
    const { handleLogin, isLoading, setLoading } = useAuthActions()

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

        setLoading(true)
        utils.devLog('Iniciando proceso de login...', 'info')

        try {
            // Intentar login con la API real
            const { loginUser } = await import('../services/UsersServices')
            const result = await loginUser(formData.email, formData.password)
            
            if (result.success) {
                // Iniciar sesión usando el contexto
                login(result.user)

                await Swal.fire({
                    icon: 'success',
                    title: '¡Bienvenido de vuelta! 🌟',
                    html: `
                        <div style="text-align: center; padding: 0.5rem;">
                            <div style="font-size: 2.5rem; margin-bottom: 1rem;">🚀</div>
                            <p style="font-size: 1rem; color: #374151; margin-bottom: 0.5rem;">
                                <strong>¡Has iniciado sesión exitosamente!</strong>
                            </p>
                            <p style="color: #6b7280; font-size: 0.9rem;">
                                Explora el cosmos y la naturaleza con nosotros
                            </p>
                        </div>
                    `,
                    confirmButtonText: 'Comenzar',
                    confirmButtonColor: '#005262',
                    timer: 4000,
                    timerProgressBar: true,
                    showClass: {
                        popup: 'animate__animated animate__fadeIn animate__faster'
                    },
                    width: '400px',
                    padding: '1.5rem'
                })
                
                // Redireccionar a la página principal
                navigate('/')
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de autenticación',
                    text: result.error || 'Credenciales incorrectas',
                    confirmButtonColor: '#005262'
                })
            }
        } catch (error) {
            utils.devLog('Error en login simulado', 'error')
            setErrors({ general: 'Error al iniciar sesión. Intenta nuevamente.' })
            
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo iniciar sesión. Intenta nuevamente.',
                confirmButtonColor: '#005262'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Iniciar Sesión</h2>
                    <p>¿No tienes una cuenta? <button onClick={() => navigate('/registro')} className="register-link">Crear cuenta</button></p>
                </div>

                <form onSubmit={handleSubmit} className="login-form" noValidate>
                    {errors.general && (
                        <div className="field-error" style={{ marginBottom: '1rem' }}>
                            {errors.general}
                        </div>
                    )}
                    
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
                            <span className="field-error">{errors.email}</span>
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
                                placeholder="Tu contraseña"
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
                        {errors.password && (
                            <span className="field-error">{errors.password}</span>
                        )}
                    </div>

                    <div className="form-options">
                        <div className="remember-section">
                            <input
                                type="checkbox"
                                id="remember"
                                name="remember"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="remember">Recordarme</label>
                        </div>
                        <button type="button" className="forgot-password">¿Olvidaste tu contraseña?</button>
                    </div>
                    
                    <button 
                        type="submit" 
                        className={`login-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignIn