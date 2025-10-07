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
                if (!value.trim()) {
                    error = 'El nombre es requerido'
                } else if (value.trim().length < 2) {
                    error = 'El nombre debe tener al menos 2 caracteres'
                }
                break
            case 'lastName':
                if (!value.trim()) {
                    error = 'El apellido es requerido'
                } else if (value.trim().length < 2) {
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
            case 'password':
                if (!value) {
                    error = 'La contraseña es requerida'
                } else if (value.length < 8) {
                    error = 'La contraseña debe tener al menos 8 caracteres'
                } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                    error = 'Debe contener al menos una mayúscula, minúscula y un número'
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
        
        // Si estamos cambiando la contraseña y confirmPassword tiene valor, revalidar confirmPassword
        if (name === 'password' && formData.confirmPassword && errors.confirmPassword) {
            validateField('confirmPassword', formData.confirmPassword)
        }
    }

    const handleBlur = (e) => {
        const { name, value } = e.target
        validateField(name, value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Validar todos los campos
        const validations = [
            validateField('firstName', formData.firstName),
            validateField('lastName', formData.lastName),
            validateField('email', formData.email),
            validateField('password', formData.password),
            validateField('confirmPassword', formData.confirmPassword)
        ]
        
        if (validations.some(isValid => !isValid)) {
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
            // Simular llamada a API (aquí irá tu conexión al backend)
            await new Promise(resolve => setTimeout(resolve, 2000))
            
            // Datos que se enviarán al backend
            const registerData = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim().toLowerCase(),
                password: formData.password
            }
            
            console.log('Datos para enviar al backend:', registerData)
            
            // TODO: Reemplazar con llamada real al backend
            // const response = await fetch('/api/auth/register', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(registerData)
            // })
            // const result = await response.json()
            
            // Simular éxito (reemplazar con respuesta real del backend)
            await Swal.fire({
                icon: 'success',
                title: '¡Cuenta creada exitosamente!',
                text: 'Ya puedes iniciar sesión con tus credenciales',
                confirmButtonColor: '#005262',
                timer: 3000,
                showConfirmButton: false
            })
            
            // Redireccionar al login
            navigate('/inicio-sesion')
            
        } catch (error) {
            console.error('Error al crear cuenta:', error)
            Swal.fire({
                icon: 'error',
                title: 'Error al crear la cuenta',
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
                                placeholder="Mínimo 8 caracteres"
                                aria-describedby={errors.password ? "password-error" : "password-help"}
                                aria-invalid={!!errors.password}
                                autoComplete="new-password"
                                minLength="8"
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
                        <small id="password-help" className="field-help">
                            Debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número
                        </small>
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
                        Presiona Enter o haz clic para crear tu cuenta con los datos ingresados
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
