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
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)

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
        const isFirstNameValid = validateField('firstName', formData.firstName)
        const isLastNameValid = validateField('lastName', formData.lastName)
        const isEmailValid = validateField('email', formData.email)
        const isUsernameValid = validateField('username', formData.username)
        const isPasswordValid = validateField('password', formData.password)
        
        if (!isFirstNameValid || !isLastNameValid || !isEmailValid || !isUsernameValid || !isPasswordValid) {
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
            
            console.log('Register data:', formData)
            
            await Swal.fire({
                icon: 'success',
                title: `¡Bienvenid@ a CelestialBloom, ${formData.firstName}! 🌟`,
                text: '¡Tu cuenta ha sido creada exitosamente!',
                confirmButtonText: 'Explorar CelestialBloom',
                confirmButtonColor: '#005262'
            })
            
            // Redireccionar al login después del registro exitoso
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
                                className={errors.firstName ? 'error' : ''}
                            />
                            {errors.firstName && (
                                <span className="field-error">
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
                                className={errors.lastName ? 'error' : ''}
                            />
                            {errors.lastName && (
                                <span className="field-error">
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
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && (
                            <span className="field-error">
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
                            className={errors.username ? 'error' : ''}
                        />
                        {!errors.username && (
                            <span className="field-help">
                                3-20 caracteres, solo letras, números y guión bajo
                            </span>
                        )}
                        {errors.username && (
                            <span className="field-error">
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
                                className={errors.password ? 'error' : ''}
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
                            <span className="field-help">
                                Mínimo 6 caracteres, incluye mayúscula, minúscula y número
                            </span>
                        )}
                        {errors.password && (
                            <span className="field-error">
                                {errors.password}
                            </span>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        className={`register-button ${isLoading ? 'loading' : ''}`}
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
