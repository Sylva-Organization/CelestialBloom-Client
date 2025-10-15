import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthActions } from '../hooks/useAuthActions'
import { formValidation, mockData, utils } from '../utils'
import './Register.css'
import { useAuth } from '../context/AuthContext'
import { sendWelcomeEmailAuto } from '../services/EmailService'
import Swal from 'sweetalert2'

const Register = () => {
    const navigate = useNavigate()
    const { register } = useAuth()
    
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
            // Intentar registro con la API real
            const { registerUser } = await import('../services/UsersServices')
            const result = await registerUser(formData)
            
            if (result.success) {
                console.log('Register data:', result.user)
                
                // Registrar y loguear automáticamente al usuario
                register(result.user)
                
                // Enviar email de bienvenida
                console.log('📧 Enviando email de bienvenida...')
                const emailResult = await sendWelcomeEmailAuto(result.user)
                
                if (emailResult.success) {
                    console.log('✅ Email de bienvenida enviado exitosamente')
                } else {
                    console.warn('⚠️ Error al enviar email de bienvenida:', emailResult.error)
                }
            
                await Swal.fire({
                    icon: 'success',
                    title: `¡Bienvenid@ a CelestialBloom, ${result.user.firstName}! 🌟`,
                html: `
                    <div style="text-align: center; padding: 1rem;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">🚀✨</div>
                        <p style="font-size: 1.1rem; color: #374151; margin-bottom: 1rem; line-height: 1.6;">
                            <strong>¡Tu cuenta ha sido creada exitosamente!</strong>
                        </p>
                        <p style="color: #6b7280; margin-bottom: 1rem; line-height: 1.5;">
                            Ahora formas parte de nuestra comunidad de exploradores del cosmos y la naturaleza.
                        </p>
                        <div style="
                            background: linear-gradient(135deg, #47b89d, #7ea83c);
                            color: white;
                            padding: 0.75rem 1.5rem;
                            border-radius: 25px;
                            display: inline-block;
                            font-weight: 500;
                            margin-bottom: 1rem;
                            box-shadow: 0 4px 12px rgba(71, 184, 157, 0.3);
                        ">
                            Usuario: @${formData.username}
                        </div>
                        <div style="
                            background: #f0f9ff;
                            border: 2px solid #0ea5e9;
                            border-radius: 12px;
                            padding: 0.75rem;
                            margin: 1rem 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 0.5rem;
                        ">
                            <span style="font-size: 1.2rem;">📧</span>
                            <span style="color: #0f172a; font-size: 0.9rem; font-weight: 500;">
                                ${emailResult.real ? 'Email de bienvenida enviado' : 'Email de bienvenida simulado'} a ${formData.email}
                            </span>
                        </div>
                        <p style="color: #374151; font-size: 0.9rem;">
                            ¡Has iniciado sesión automáticamente! Serás redirigido al inicio...
                        </p>
                    </div>
                `,
                confirmButtonText: 'Explorar CelestialBloom',
                confirmButtonColor: '#005262',
                timer: 6000,
                timerProgressBar: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInUp animate__faster'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutDown animate__faster'
                },
                customClass: {
                    popup: 'welcome-popup',
                    confirmButton: 'welcome-button'
                },
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                width: '500px',
                padding: '2rem'
            })
                
                // Redireccionar al inicio después del registro exitoso
                navigate('/')
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error en el registro',
                    text: result.error || 'No se pudo crear la cuenta',
                    confirmButtonColor: '#005262'
                })
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
