import './SignIn.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Swal from 'sweetalert2'

const SignIn = () => {
    const navigate = useNavigate()
    const { login } = useAuth()
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)

    const validateField = (name, value) => {
        let error = ''
        
        switch (name) {
            case 'email':
                if (!value) {
                    error = 'El correo electrónico es requerido'
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Ingresa un correo electrónico válido'
                }
                break
            case 'password':
                if (!value) {
                    error = 'La contraseña es requerida'
                } else if (value.length < 6) {
                    error = 'La contraseña debe tener al menos 6 caracteres'
                }
                break
        }
        
        setErrors(prev => ({
            ...prev,
            [name]: error
        }))
        
        return !error
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        
        // Validar en tiempo real solo si el campo ya tiene un error
        if (errors[name]) {
            validateField(name, value)
        }
    }

    const handleBlur = (e) => {
        const { name, value } = e.target
        validateField(name, value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Validar todos los campos
        const isEmailValid = validateField('email', formData.email)
        const isPasswordValid = validateField('password', formData.password)
        
        if (!isEmailValid || !isPasswordValid) {
            Swal.fire({
                icon: 'warning',
                title: 'Datos incorrectos',
                text: 'Por favor, corrige los errores en el formulario',
                confirmButtonColor: '#005262'
            })
            return
        }

        setIsLoading(true)

        try {
            // Simular llamada a API
            await new Promise(resolve => setTimeout(resolve, 2000))
            
            // Simular validación básica (para demo)
            if (formData.email === 'admin@ejemplo.com' && formData.password === 'admin123') {
                // Datos simulados del usuario
                const userData = {
                    email: formData.email,
                    firstName: 'Administrador',
                    lastName: 'Sistema',
                    username: 'admin'
                }

                // Iniciar sesión usando el contexto
                login(userData)

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
                    title: 'Credenciales incorrectas',
                    text: 'El correo electrónico o la contraseña son incorrectos',
                    confirmButtonColor: '#005262'
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo conectar con el servidor. Inténtalo de nuevo.',
                confirmButtonColor: '#005262'
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleRegisterClick = (e) => {
        e.preventDefault()
        navigate('/registro')
    }

    const handleForgotPassword = (e) => {
        e.preventDefault()
        Swal.fire({
            title: 'Recuperar Contraseña',
            html: `
                <p style="margin-bottom: 1rem; color: #374151;">Ingresa tu email para recuperar tu contraseña:</p>
                <input 
                    type="email" 
                    id="recovery-email" 
                    placeholder="tu-email@ejemplo.com"
                    style="
                        width: 100%; 
                        padding: 0.75rem; 
                        margin: 1rem 0; 
                        border: 1px solid #d1d5db; 
                        border-radius: 8px;
                        font-size: 1rem;
                        box-sizing: border-box;
                        background: #f9fafb;
                    "
                />
            `,
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#005262',
            cancelButtonColor: '#6b7280',
            preConfirm: () => {
                const email = document.getElementById('recovery-email').value
                if (!email) {
                    Swal.showValidationMessage('Por favor ingresa tu email')
                    return false
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    Swal.showValidationMessage('Por favor ingresa un email válido')
                    return false
                }
                return email
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: 'Correo enviado',
                    text: `Se ha enviado un enlace de recuperación a ${result.value}`,
                    confirmButtonColor: '#005262'
                })
            }
        })
    }

    return (
        <div className="signin-container">
            <div className="signin-card">
                <div className="signin-header">
                    <h2>Iniciar Sesión</h2>
                    <p>¿No tienes una cuenta? <button onClick={handleRegisterClick} className="register-link">Crear cuenta</button></p>
                </div>

                <form onSubmit={handleSubmit} className="signin-form" noValidate>
                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            required
                            placeholder="tu-email@ejemplo.com"
                            aria-describedby={errors.email ? "email-error" : undefined}
                            aria-invalid={!!errors.email}
                            autoComplete="email"
                        />
                        {errors.email && (
                            <span id="email-error" className="field-error" role="alert">
                                {errors.email}
                            </span>
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
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                required
                                placeholder="Tu contraseña"
                                aria-describedby={errors.password ? "password-error" : undefined}
                                aria-invalid={!!errors.password}
                                autoComplete="current-password"
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
                            <span id="password-error" className="field-error" role="alert">
                                {errors.password}
                            </span>
                        )}
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="forgot-password-link"
                            onClick={handleForgotPassword}
                        >
                            ¿Olvidaste tu contraseña?
                        </button>
                    </div>

                    <button 
                        type="submit" 
                        className={`signin-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                        aria-describedby="signin-button-help"
                    >
                        {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </button>
                    <div id="signin-button-help" className="sr-only">
                        Presiona Enter o haz clic para iniciar sesión
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn