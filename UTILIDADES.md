# 🛠️ Utilidades Frontend - CelestialBloom

Este proyecto incluye un conjunto completo de utilidades frontend **sin dependencias de APIs**, diseñadas para desarrollo y prototipado rápido.

## 📦 Utilidades Disponibles

### 🕐 DateUtils - Formateo de Fechas
```javascript
import { dateUtils } from '../utils'

// Formatear fecha en español
dateUtils.formatDate('2024-01-15') // "15 de enero de 2024"

// Fecha corta
dateUtils.formatShortDate('2024-01-15') // "15/1/2024"

// Tiempo relativo
dateUtils.getRelativeDate('2024-01-15') // "hace 3 meses"

// Validar fecha
dateUtils.isValidDate(new Date()) // true
```

### 🛡️ FormValidation - Validación de Formularios
```javascript
import { formValidation } from '../utils'

// Validar email
formValidation.validateEmail('ana@example.com')
// { isValid: true, message: 'Email válido' }

// Validar contraseña (mínimo 6 chars, mayús, minús, número)
formValidation.validatePassword('Test123!')
// { isValid: true, errors: [], message: 'Contraseña válida' }

// Validar nombre (solo letras y espacios)
formValidation.validateName('Ana García')
// { isValid: true, message: 'Nombre válido' }

// Validar formulario completo
formValidation.validateRegisterForm({
    name: 'Ana García',
    email: 'ana@example.com',
    password: 'Test123!'
})
```

### 🎭 MockData - Datos Simulados
```javascript
import { mockData } from '../utils'

// Generar usuario aleatorio
const user = mockData.generateRandomUser()
// { id: 123, name: 'Ana García', email: 'ana@celestialbloom.com', ... }

// Generar artículo aleatorio
const article = mockData.generateRandomArticle()
// { id: 456, title: 'Nuevos Planetas Descubiertos', category: 'astronomy', ... }

// Simular login exitoso
const loginResponse = mockData.mockLoginSuccess('ana@example.com')
// { success: true, user: {...}, token: 'mock_token_123', message: 'Login exitoso' }

// Datos predefinidos
console.log(mockData.users) // Array de usuarios de ejemplo
console.log(mockData.articles) // Array de artículos de ejemplo
```

### 🔧 Utils - Utilidades Generales
```javascript
import { utils } from '../utils'

// Generar ID único
utils.generateId() // "1697123456789abc123def"

// Capitalizar texto
utils.capitalize('hello world') // "Hello world"

// Crear slug para URLs
utils.slugify('Artículo de Astronomía!') // "articulo-de-astronomia"

// Truncar texto
utils.truncate('Texto muy largo...', 20) // "Texto muy largo..."

// Debounce para optimizar búsquedas
const debouncedSearch = utils.debounce(searchFunction, 300)

// Logs de desarrollo con estilos
utils.devLog('Mensaje importante', 'success') // Log verde
utils.devLog('Advertencia', 'warning') // Log amarillo
utils.devLog('Error crítico', 'error') // Log rojo
```

## 🚀 Implementación en Componentes

### Formulario de Login con Validación
```javascript
import { useState } from 'react'
import { formValidation, mockData, utils } from '../utils'

const SignIn = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Validar formulario
        const validation = formValidation.validateLoginForm(formData)
        
        if (!validation.isValid) {
            // Mostrar errores
            const newErrors = {}
            validation.errors.forEach(field => {
                newErrors[field] = validation.results[field].message
            })
            setErrors(newErrors)
            return
        }

        // Simular login
        const mockResponse = mockData.mockLoginSuccess(formData.email)
        if (mockResponse.success) {
            utils.devLog('Login exitoso', 'success')
            // Procesar login...
        }
    }

    // ... resto del componente
}
```

### Lista de Artículos con Fechas Formateadas
```javascript
import { dateUtils, mockData, utils } from '../utils'

const ArticlesList = ({ articles }) => {
    return (
        <div>
            {articles.map(article => (
                <div key={article.id}>
                    <h3>{article.title}</h3>
                    <p>Por {article.author}</p>
                    <p>{dateUtils.getRelativeDate(article.date)}</p>
                    <p>{utils.truncate(article.content, 100)}</p>
                    <small>{dateUtils.formatDate(article.date)}</small>
                </div>
            ))}
        </div>
    )
}
```

## 🧪 DevUtil - Herramienta de Desarrollo

El componente `DevUtil` incluye botones para probar todas las utilidades:

- **📅 Fechas**: Prueba formateo y validación de fechas
- **🛡️ Validación**: Prueba validación de formularios
- **🎭 Mock Data**: Genera datos de ejemplo
- **🔧 Utilidades**: Prueba funciones auxiliares

Todos los resultados se muestran en la **consola del navegador** con logs coloridos y detallados.

## 📋 Logs en Consola

Todas las utilidades generan logs detallados en la consola del navegador:

```
🕐 DateUtils cargado - Sistema de fechas frontend
📅 Formateando fecha: 2024-01-15 -> 15 de enero de 2024
🛡️ FormValidation cargado - Sistema de validación frontend
📧 Validando email: ana@example.com
✅ Email válido
🎭 MockData cargado - Sistema de datos simulados frontend
👤 Usuario generado: { id: 123, name: 'Ana García', ... }
```

## 🎯 Características Principales

- ✅ **100% Frontend**: Sin llamadas a APIs
- ✅ **Logs detallados**: Información completa en consola
- ✅ **Datos simulados**: Mock data para desarrollo
- ✅ **Validación robusta**: Formularios con validación completa
- ✅ **Fechas en español**: Formateo localizado
- ✅ **Herramienta de desarrollo**: DevUtil para pruebas rápidas
- ✅ **Sin dependencias externas**: Código vanilla JavaScript/React

## 🔧 Uso Rápido

1. Importa las utilidades: `import { dateUtils, formValidation, mockData, utils } from '../utils'`
2. Usa el DevUtil para probar funcionalidades
3. Revisa la consola del navegador para ver los logs
4. Integra en tus componentes según necesites

¡Todas las utilidades están listas para usar y completamente documentadas con logs en consola!
