import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { dateUtils, formValidation, mockData, utils } from '../utils'

const DevUtil = () => {
    const { isAuthenticated, login, logout, getUser } = useAuth()
    const [showUtils, setShowUtils] = useState(false)

    const handleQuickLogin = () => {
        const randomUser = mockData.generateRandomUser()
        login(randomUser)
    }

    const testDateUtils = () => {
        utils.devLog('=== Probando utilidades de fecha ===', 'info')
        const testDate = new Date()
        const oldDate = new Date('2024-01-15')
        
        console.log('Fecha actual:', dateUtils.formatDate(testDate))
        console.log('Fecha corta:', dateUtils.formatShortDate(testDate))
        console.log('Fecha relativa:', dateUtils.getRelativeDate(oldDate))
        console.log('Fecha válida:', dateUtils.isValidDate(testDate))
    }

    const testFormValidation = () => {
        utils.devLog('=== Probando validación de formularios ===', 'info')
        const testData = {
            name: 'Ana García',
            email: 'ana@test.com',
            password: 'Test123!'
        }
        
        console.log('Validación nombre:', formValidation.validateName(testData.name))
        console.log('Validación email:', formValidation.validateEmail(testData.email))
        console.log('Validación password:', formValidation.validatePassword(testData.password))
        console.log('Validación completa:', formValidation.validateRegisterForm(testData))
    }

    const testMockData = () => {
        utils.devLog('=== Probando datos simulados ===', 'info')
        console.log('Usuario aleatorio:', mockData.generateRandomUser())
        console.log('Artículo aleatorio:', mockData.generateRandomArticle())
        console.log('Login simulado:', mockData.mockLoginSuccess('test@example.com'))
    }

    const testUtils = () => {
        utils.devLog('=== Probando utilidades generales ===', 'info')
        console.log('ID generado:', utils.generateId())
        console.log('Capitalizar:', utils.capitalize('hello world'))
        console.log('Slug:', utils.slugify('Artículo de Astronomía!'))
        console.log('Truncar:', utils.truncate('Este es un texto muy largo que será truncado', 20))
    }

    // Solo mostrar en desarrollo
    if (process.env.NODE_ENV === 'production') return null

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: '#333',
            color: 'white',
            padding: '15px',
            borderRadius: '8px',
            fontSize: '12px',
            zIndex: 1000,
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            minWidth: '250px',
            maxHeight: showUtils ? '400px' : 'auto',
            overflowY: showUtils ? 'auto' : 'visible'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <strong>🛠️ DevUtil</strong>
                <button 
                    onClick={() => setShowUtils(!showUtils)}
                    style={{
                        background: 'transparent',
                        color: 'white',
                        border: '1px solid #666',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '10px'
                    }}
                >
                    {showUtils ? '🔼' : '🔽'}
                </button>
            </div>
            
            <div>Auth: {isAuthenticated ? '✅' : '❌'}</div>
            {isAuthenticated ? (
                <div>
                    <div>User: {getUser()?.name}</div>
                    <button 
                        onClick={logout}
                        style={{
                            background: '#dc2626',
                            color: 'white',
                            border: 'none',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginTop: '5px',
                            marginRight: '5px'
                        }}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <button 
                    onClick={handleQuickLogin}
                    style={{
                        background: '#059669',
                        color: 'white',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginTop: '5px'
                    }}
                >
                    Quick Login
                </button>
            )}

            {showUtils && (
                <div style={{ marginTop: '15px', borderTop: '1px solid #666', paddingTop: '10px' }}>
                    <div><strong>🧪 Test Utils</strong></div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '8px' }}>
                        <button onClick={testDateUtils} style={buttonStyle}>📅 Fechas</button>
                        <button onClick={testFormValidation} style={buttonStyle}>🛡️ Validación</button>
                        <button onClick={testMockData} style={buttonStyle}>🎭 Mock Data</button>
                        <button onClick={testUtils} style={buttonStyle}>🔧 Utilidades</button>
                    </div>
                    <div style={{ marginTop: '10px', fontSize: '10px', color: '#ccc' }}>
                        Revisa la consola del navegador para ver los logs
                    </div>
                </div>
            )}
        </div>
    )
}

const buttonStyle = {
    background: '#4a5568',
    color: 'white',
    border: 'none',
    padding: '3px 6px',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '10px'
}

export default DevUtil
