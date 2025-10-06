import './SignIn.css'
import { useState } from 'react'

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [rememberMe, setRememberMe] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Login data:', { ...formData, rememberMe })
        // Aquí iría la lógica de autenticación
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Acceder a tu cuenta</h2>
                    <p>¿No tienes una cuenta? <a href="#" className="register-link">Crear una cuenta</a></p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Ingresa tu correo electrónico"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            placeholder="Ingresa tu contraseña"
                        />
                    </div>

                    <div className="form-options">
                        <div className="remember-section">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="remember">Recordar contraseña</label>
                        </div>
                        <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
                    </div>

                    <button type="submit" className="login-button">
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignIn