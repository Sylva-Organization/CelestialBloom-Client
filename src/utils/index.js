// Índice de todas las utilidades frontend - Sin APIs
console.log('🛠️ Utils Index cargado - Todas las utilidades frontend disponibles')

// Importar todas las utilidades
export { dateUtils } from './dateUtils.js'
export { formValidation } from './formValidation.js'
export { mockData } from './mockData.js'

// Utilidades adicionales
export const utils = {
    // Generar ID único
    generateId: () => {
        const id = Date.now() + Math.random().toString(36).substr(2, 9)
        console.log('🆔 ID generado:', id)
        return id
    },

    // Capitalizar primera letra
    capitalize: (str) => {
        if (!str) return ''
        const capitalized = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
        console.log('📝 Texto capitalizado:', str, '->', capitalized)
        return capitalized
    },

    // Formatear texto para URL (slug)
    slugify: (text) => {
        if (!text) return ''
        const slug = text
            .toLowerCase()
            .replace(/[áéíóúñ]/g, (match) => {
                const accents = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ñ': 'n' }
                return accents[match] || match
            })
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
        console.log('🔗 Slug generado:', text, '->', slug)
        return slug
    },

    // Truncar texto
    truncate: (text, length = 100) => {
        if (!text || text.length <= length) return text
        const truncated = text.substring(0, length).trim() + '...'
        console.log('✂️ Texto truncado:', text.length, 'chars ->', length, 'chars')
        return truncated
    },

    // Debounce para optimizar búsquedas
    debounce: (func, delay) => {
        let timeoutId
        console.log('⏱️ Debounce configurado con delay:', delay, 'ms')
        return (...args) => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                console.log('🚀 Ejecutando función con debounce')
                func.apply(null, args)
            }, delay)
        }
    },

    // Log de desarrollo con estilos
    devLog: (message, type = 'info') => {
        const styles = {
            info: 'color: #3498db; font-weight: bold;',
            success: 'color: #27ae60; font-weight: bold;',
            warning: 'color: #f39c12; font-weight: bold;',
            error: 'color: #e74c3c; font-weight: bold;',
            debug: 'color: #9b59b6; font-weight: bold;'
        }
        console.log(`%c[CelestialBloom] ${message}`, styles[type] || styles.info)
    }
}

// Log de inicialización
console.log('✅ Todas las utilidades frontend cargadas correctamente')
console.log('📦 Disponibles: dateUtils, formValidation, mockData, utils')
