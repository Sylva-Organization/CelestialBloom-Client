import './Register.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Register = () => {
    const navigate = useNavigate()
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const validateField = (name, value) => {
        let error = ''
        
        switch (name) {
            case 'firstName':
                if (!value) {
                    error = 'El nombre es requerido'
                } else if (value.length < 2) {
                    error = 'El nombre debe tener al menos 2 caracteres'
                }
                break
            case 'lastName':
                if (!value) {
                    error = 'El apellido es requerido'
                } else if (value.length < 2) {
                    error = 'El apellido debe tener al menos 2 caracteres'
                }
                break
            case 'email':
                if (!value) {
                    error = 'El correo electrónico es requerido'
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Ingresa un correo electrónico válido'
                }
                break
            case 'username':
                if (!value) {
                    error = 'El nombre de usuario es requerido'
                } else if (value.length < 3) {
                    error = 'El usuario debe tener al menos 3 caracteres'
                } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                    error = 'Solo se permiten letras, números y guión bajo'
                } else if (value.length > 20) {
                    error = 'El usuario no puede tener más de 20 caracteres'
                }
                break
            case 'password':
                if (!value) {
                    error = 'La contraseña es requerida'
                } else if (value.length < 6) {
                    error = 'La contraseña debe tener al menos 6 caracteres'
                } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                    error = 'Debe contener al menos una mayúscula, una minúscula y un número'
                }
                break
            case 'confirmPassword':
                if (!value) {
                    error = 'Confirma tu contraseña'
                } else if (value !== formData.password) {
                    error = 'Las contraseñas no coinciden'
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
        
        // Si se está editando la contraseña, revalidar confirmPassword si ya tiene valor
        if (name === 'password' && formData.confirmPassword && errors.confirmPassword) {
            setErrors(prev => ({
                ...prev,
                confirmPassword: value !== formData.confirmPassword ? 'Las contraseñas no coinciden' : ''
            }))
        }
    }

    const handleBlur = (e) => {
        const { name, value } = e.target
        validateField(name, value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Validar todos los campos
        const isFirstNameValid = validateField('firstName', formData.firstName)
        const isLastNameValid = validateField('lastName', formData.lastName)
        const isEmailValid = validateField('email', formData.email)
        const isUsernameValid = validateField('username', formData.username)
        const isPasswordValid = validateField('password', formData.password)
        const isConfirmPasswordValid = validateField('confirmPassword', formData.confirmPassword)
        
        if (!isFirstNameValid || !isLastNameValid || !isEmailValid || !isUsernameValid || !isPasswordValid || !isConfirmPasswordValid) {
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
            
            console.log('Register data:', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                username: formData.username,
                password: formData.password
            })
            
            await Swal.fire({
                icon: 'success',
                title: '¡Cuenta creada exitosamente!',
                text: 'Tu cuenta ha sido registrada. Ahora puedes iniciar sesión.',
                confirmButtonColor: '#005262',
                timer: 3000,
                showConfirmButton: false
            })
            
            // Redireccionar a login después del registro exitoso
            navigate('/inicio-sesion')
            
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al crear cuenta',
                text: 'No se pudo crear la cuenta. Inténtalo de nuevo.',
                confirmButtonColor: '#005262'
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleSignInClick = (e) => {
        e.preventDefault()
        navigate('/inicio-sesion')
    }

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-header">
                    <h2>Crear tu cuenta</h2>
                    <p>¿Ya tienes una cuenta? <button onClick={handleSignInClick} className="signin-link">Iniciar sesión</button></p>
                </div>

                <form onSubmit={handleSubmit} className="register-form" noValidate>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">Nombre</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                required
                                placeholder="Tu nombre"
                                aria-describedby={errors.firstName ? "firstName-error" : undefined}
                                aria-invalid={!!errors.firstName}
                                autoComplete="given-name"
                            />
                            {errors.firstName && (
                                <span id="firstName-error" className="field-error" role="alert">
                                    {errors.firstName}
                                </span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Apellido</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                required
                                placeholder="Tu apellido"
                                aria-describedby={errors.lastName ? "lastName-error" : undefined}
                                aria-invalid={!!errors.lastName}
                                autoComplete="family-name"
                            />
                            {errors.lastName && (
                                <span id="lastName-error" className="field-error" role="alert">
                                    {errors.lastName}
                                </span>
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
                        <label htmlFor="username">Usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            required
                            placeholder="Elige tu nombre de usuario"
                            aria-describedby={errors.username ? "username-error username-help" : "username-help"}
                            aria-invalid={!!errors.username}
                            autoComplete="username"
                            minLength="3"
                            maxLength="20"
                        />
                        {!errors.username && (
                            <span id="username-help" className="field-help">
                                3-20 caracteres, solo letras, números y guión bajo
                            </span>
                        )}
                        {errors.username && (
                            <span id="username-error" className="field-error" role="alert">
                                {errors.username}
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
                                placeholder="Crea una contraseña segura"
                                aria-describedby={errors.password ? "password-error password-help" : "password-help"}
                                aria-invalid={!!errors.password}
                                autoComplete="new-password"
                                minLength="6"
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
                        {!errors.password && (
                            <span id="password-help" className="field-help">
                                Mínimo 6 caracteres, incluye mayúscula, minúscula y número
                            </span>
                        )}
                        {errors.password && (
                            <span id="password-error" className="field-error" role="alert">
                                {errors.password}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar contraseña</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                required
                                placeholder="Repite tu contraseña"
                                aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                                aria-invalid={!!errors.confirmPassword}
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            >
                                {showConfirmPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <span id="confirmPassword-error" className="field-error" role="alert">
                                {errors.confirmPassword}
                            </span>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        className={`register-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                        aria-describedby="register-button-help"
                    >
                        {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
                    </button>
                    <div id="register-button-help" className="sr-only">
                        Presiona Enter o haz clic para crear tu nueva cuenta
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
