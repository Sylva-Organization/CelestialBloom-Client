// Utilidades para validación de formularios - Frontend only
console.log('🛡️ FormValidation cargado - Sistema de validación frontend')

export const formValidation = {
    // Validar email
    validateEmail: (email) => {
        console.log('📧 Validando email:', email)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const isValid = emailRegex.test(email)
        console.log(isValid ? '✅ Email válido' : '❌ Email inválido')
        return {
            isValid,
            message: isValid ? 'Email válido' : 'Por favor ingresa un email válido'
        }
    },

    // Validar contraseña
    validatePassword: (password) => {
        console.log('🔐 Validando contraseña:', password ? '***' : 'vacía')
        const errors = []
        
        if (!password) {
            errors.push('La contraseña es requerida')
        } else {
            if (password.length < 6) {
                errors.push('Debe tener al menos 6 caracteres')
            }
            if (!/(?=.*[a-z])/.test(password)) {
                errors.push('Debe contener al menos una letra minúscula')
            }
            if (!/(?=.*[A-Z])/.test(password)) {
                errors.push('Debe contener al menos una letra mayúscula')
            }
            if (!/(?=.*\d)/.test(password)) {
                errors.push('Debe contener al menos un número')
            }
        }

        const isValid = errors.length === 0
        console.log(isValid ? '✅ Contraseña válida' : '❌ Contraseña inválida:', errors)
        return {
            isValid,
            errors,
            message: isValid ? 'Contraseña válida' : errors.join('. ')
        }
    },

    // Validar nombre (solo letras y espacios)
    validateName: (name) => {
        console.log('👤 Validando nombre:', name)
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
        const isValid = name && name.trim().length >= 2 && nameRegex.test(name)
        console.log(isValid ? '✅ Nombre válido' : '❌ Nombre inválido')
        return {
            isValid,
            message: isValid ? 'Nombre válido' : 'Ingresa un nombre válido (mínimo 2 caracteres, solo letras)'
        }
    },

    // Validar formulario completo de registro
    validateRegisterForm: (formData) => {
        console.log('📋 Validando formulario de registro:', formData)
        const results = {
            name: formValidation.validateName(formData.name),
            email: formValidation.validateEmail(formData.email),
            password: formValidation.validatePassword(formData.password)
        }

        const isValid = Object.values(results).every(result => result.isValid)
        console.log(isValid ? '✅ Formulario de registro válido' : '❌ Formulario de registro inválido')
        
        return {
            isValid,
            results,
            errors: Object.keys(results).filter(key => !results[key].isValid)
        }
    },

    // Validar formulario de login
    validateLoginForm: (formData) => {
        console.log('🔑 Validando formulario de login:', formData)
        const results = {
            email: formValidation.validateEmail(formData.email),
            password: formData.password ? { isValid: true, message: 'OK' } : { isValid: false, message: 'Contraseña requerida' }
        }

        const isValid = Object.values(results).every(result => result.isValid)
        console.log(isValid ? '✅ Formulario de login válido' : '❌ Formulario de login inválido')
        
        return {
            isValid,
            results,
            errors: Object.keys(results).filter(key => !results[key].isValid)
        }
    }
}
