// Utilidades para formateo de fechas - Frontend only
export const dateUtils = {
    // Formatear fecha en español
    formatDate: (date) => {
        if (!date) return 'Fecha no disponible'
        
        const dateObj = new Date(date)
        if (isNaN(dateObj.getTime())) return 'Fecha inválida'
        
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'America/Lima'
        }
        
        console.log(`📅 Formateando fecha: ${date} -> ${dateObj.toLocaleDateString('es-ES', options)}`)
        return dateObj.toLocaleDateString('es-ES', options)
    },

    // Formatear fecha corta
    formatShortDate: (date) => {
        if (!date) return '--/--/----'
        
        const dateObj = new Date(date)
        if (isNaN(dateObj.getTime())) return '--/--/----'
        
        const formatted = dateObj.toLocaleDateString('es-ES')
        console.log(`📆 Fecha corta: ${date} -> ${formatted}`)
        return formatted
    },

    // Obtener fecha relativa (hace X días)
    getRelativeDate: (date) => {
        if (!date) return 'Fecha desconocida'
        
        const dateObj = new Date(date)
        if (isNaN(dateObj.getTime())) return 'Fecha inválida'
        
        const now = new Date()
        const diffTime = Math.abs(now - dateObj)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        
        let relative = ''
        if (diffDays === 1) {
            relative = 'hace 1 día'
        } else if (diffDays < 7) {
            relative = `hace ${diffDays} días`
        } else if (diffDays < 30) {
            const weeks = Math.floor(diffDays / 7)
            relative = weeks === 1 ? 'hace 1 semana' : `hace ${weeks} semanas`
        } else if (diffDays < 365) {
            const months = Math.floor(diffDays / 30)
            relative = months === 1 ? 'hace 1 mes' : `hace ${months} meses`
        } else {
            const years = Math.floor(diffDays / 365)
            relative = years === 1 ? 'hace 1 año' : `hace ${years} años`
        }
        
        console.log(`⏰ Fecha relativa: ${date} -> ${relative}`)
        return relative
    },

    // Validar si una fecha es válida
    isValidDate: (date) => {
        const dateObj = new Date(date)
        const isValid = !isNaN(dateObj.getTime())
        console.log(`✅ Validación de fecha: ${date} -> ${isValid ? 'válida' : 'inválida'}`)
        return isValid
    }
}
