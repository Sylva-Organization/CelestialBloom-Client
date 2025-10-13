import emailjs from '@emailjs/browser'

// Configuración de EmailJS
const EMAIL_CONFIG = {
    serviceId: 'service_xxxxxxx', // Reemplazar con tu Service ID
    templateId: 'template_xxxxxxx', // Reemplazar con tu Template ID
    publicKey: 'xxxxxxxxxxxxxxxxx' // Reemplazar con tu Public Key
}

// Función para validar la configuración de EmailJS
export const validateEmailConfig = () => {
    const { serviceId, templateId, publicKey } = EMAIL_CONFIG
    
    if (serviceId.includes('xxxxxxx') || templateId.includes('xxxxxxx') || publicKey.includes('xxxxxxx')) {
        console.warn('⚠️ EmailJS no está configurado correctamente. Revisa EMAIL_CONFIG en EmailService.js')
        return false
    }
    
    return true
}

// Modo de desarrollo/producción
const isDevelopment = import.meta.env.DEV
const useRealEmail = validateEmailConfig() && !isDevelopment

// Inicializar EmailJS solo si está configurado
if (useRealEmail) {
    emailjs.init(EMAIL_CONFIG.publicKey)
}

export const sendWelcomeEmail = async (userData) => {
    try {
        // Configurar los parámetros del template de email
        const templateParams = {
            to_name: userData.firstName,
            to_email: userData.email,
            user_name: userData.username,
            full_name: `${userData.firstName} ${userData.lastName}`,
            from_name: 'CelestialBloom',
            reply_to: 'noreply@celestialbloom.com'
        }

        console.log('📧 Enviando email de bienvenida a:', userData.email)
        
        // Enviar el email
        const response = await emailjs.send(
            EMAIL_CONFIG.serviceId,
            EMAIL_CONFIG.templateId,
            templateParams
        )

        console.log('✅ Email enviado exitosamente:', response)
        return { 
            success: true, 
            response,
            real: true,
            message: 'Email de bienvenida enviado correctamente'
        }
        
    } catch (error) {
        console.error('❌ Error al enviar email:', error)
        return { 
            success: false, 
            error,
            real: true,
            message: 'Error al enviar el email de bienvenida'
        }
    }
}

// Función simulada para desarrollo
export const sendWelcomeEmailDemo = async (userData) => {
    // Simular delay de envío
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('📧 DEMO: Email de bienvenida simulado enviado a:', {
        destinatario: userData.email,
        nombre: userData.firstName,
        usuario: userData.username,
        asunto: 'Bienvenid@ a CelestialBloom 🌟',
        mensaje: `Hola ${userData.firstName}, bienvenid@ a nuestra comunidad de exploradores del cosmos y la naturaleza.`
    })
    
    return { 
        success: true, 
        demo: true,
        real: false,
        message: 'Email de bienvenida simulado enviado correctamente' 
    }
}

// Función principal que decide automáticamente entre real o demo
export const sendWelcomeEmailAuto = async (userData) => {
    if (useRealEmail) {
        console.log('🚀 Enviando email real con EmailJS')
        return await sendWelcomeEmail(userData)
    } else {
        console.log('🎭 Enviando email simulado (modo demo)')
        return await sendWelcomeEmailDemo(userData)
    }
}
