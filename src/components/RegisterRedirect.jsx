import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const RegisterRedirect = () => {
    const navigate = useNavigate()

    useEffect(() => {
        Swal.fire({
            title: 'Registro no disponible',
            html: `
                <div style="text-align: left; color: #374151; line-height: 1.6;">
                    <p style="margin-bottom: 1rem;"><strong>La funcionalidad de registro está en desarrollo.</strong></p>
                    <p style="margin-bottom: 1rem;">Para acceder al registro:</p>
                    <ol style="margin-left: 1.5rem; margin-bottom: 1rem;">
                        <li>Cambia a la rama <code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-family: monospace;">register</code></li>
                        <li>O contacta al equipo de desarrollo</li>
                    </ol>
                </div>
            `,
            icon: 'info',
            confirmButtonText: 'Ir al Login',
            confirmButtonColor: '#005262',
        }).then(() => {
            navigate('/inicio-sesion')
        })
    }, [navigate])

    return (
        <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'linear-gradient(to right, rgba(126, 168, 60, 0.7), rgba(71, 184, 157, 0.7))'
        }}>
            <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '15px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                maxWidth: '400px'
            }}>
                <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>Redirigiendo...</h2>
                <p style={{ color: '#6b7280' }}>Te estamos redirigiendo al login</p>
            </div>
        </div>
    )
}

export default RegisterRedirect
