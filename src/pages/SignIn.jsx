import './SignIn.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import Swal from 'sweetalert2'
import { loginUser } from '../services/AuthServices'

const SignIn = () => {
    const navigate = useNavigate()
    const setAuth = useAuthStore((state) => state.setAuth)

    const [formData, setFormData] = useState({
        identifier: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)

    const validateField = (name, value) => {
        let error = ''

        switch (name) {
            case 'identifier':
                if (!value) {
                    error = 'El correo electrónico o nombre de usuario es requerido'
                } else if (value.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
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

        const isIdentifierValid = validateField('identifier', formData.identifier)
        const isPasswordValid = validateField('password', formData.password)

        if (!isIdentifierValid || !isPasswordValid) {
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

            const data = await loginUser({
                identifier: formData.identifier,
                password: formData.password
            })

            const user = {
                id: data.data.id,
                firstName: data.data.first_name,
                lastName: data.data.last_name,
                username: data.data.nick_name,
                role: data.data.role
            }

            const token = data.token
            setAuth(user, token)

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

            navigate('/')
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
                        <label htmlFor="identifier">Correo o nombre de usuario</label>
                        <input
                            type="text"
                            id="identifier"
                            name="identifier"
                            value={formData.identifier}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            required
                            placeholder="tu-email@ejemplo.com o tu_nickname"
                            aria-describedby={errors.identifier ? "identifier-error" : undefined}
                            aria-invalid={!!errors.identifier}
                            autoComplete="username"
                        />
                        {errors.identifier && (
                            <span id="identifier-error" className="field-error" role="alert">
                                {errors.identifier}
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

                    {/* <div className="form-actions">
                        <button
                            type="button"
                            className="forgot-password-link"
                            onClick={handleForgotPassword}
                        >
                            ¿Olvidaste tu contraseña?
                        </button>
                    </div> */}

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
