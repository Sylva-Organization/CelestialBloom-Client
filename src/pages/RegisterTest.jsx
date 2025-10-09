import './Register.css'

const RegisterTest = () => {
    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-header">
                    <h2>TEST - Crear tu cuenta</h2>
                    <p>Formulario de prueba para debug</p>
                </div>
                <form className="register-form">
                    <div className="form-group">
                        <label htmlFor="test-email">Email de prueba</label>
                        <input
                            type="email"
                            id="test-email"
                            placeholder="test@ejemplo.com"
                        />
                    </div>
                    <button type="button" className="register-button">
                        TEST - Crear cuenta
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RegisterTest
