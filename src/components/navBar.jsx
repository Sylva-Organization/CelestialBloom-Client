import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import Swal from 'sweetalert2'

const Navbar = () => {
    const navigate = useNavigate()

    const user = useAuthStore((state) => state.user)
    const token = useAuthStore((state) => state.token)
    const logout = useAuthStore((state) => state.logout)

    const isAdmin = useAuthStore((s) => s.isAdmin?.() ?? s.roles?.includes('admin'));


    const handleLogout = () => {
        Swal.fire({
            title: '¿Cerrar sesión?',
            text: '¿Estás seguro de que quieres cerrar tu sesión?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                logout()
                Swal.fire({
                    title: '¡Sesión cerrada!',
                    text: 'Has cerrado sesión exitosamente.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
                navigate('/')
            }
        })
    }

    return (
        <nav id='top'>
            <Link to='/' className='nav-title'>
                <img src='/logo.PNG' className='logo-img' alt='logo' />
            </Link>

            <ul className='menu'>
                <li className='menu-item'>
                    <Link to='/' className='nav-link'>Inicio</Link>
                </li>
                <li className='menu-item'>
                    <Link to='/astronomia' className='nav-link'>Astronomía</Link>
                </li>
                <li className='menu-item'>
                    <Link to='/botanica' className='nav-link'>Botánica</Link>
                </li>
                <li className='menu-item'>
                    <Link to='/creadoras' className='nav-link'>Creadoras</Link>
                </li>

                {!token && (
                    <>
                        <li className='menu-item'>
                            <Link to='/inicio-sesion' className='nav-link btn btn-sign-in'>Sign in</Link>
                        </li>
                        <li className='menu-item'>
                            <Link to='/register' className='nav-link btn btn-register'>Register</Link>
                        </li>
                    </>
                )}

                   {isAdmin && (
                    <li className='menu-item'>
                        <Link to='/create-form' className='nav-link btn btn-create'>
                            Crear post
                        </Link>
                    </li>
                )}

                {token && (
                    <>
                        <li className='menu-item user-info'>
                            <span className='nav-link user-welcome'>
                                <Link to={`/user-profile/${user?.id}`} className='nav-link user-welcome'>
                                    ¡Hola, {user?.firstName || user?.username || 'Usuario'}!
                                </Link>
                            </span>
                        </li>
                        <li className='menu-item'>
                            <button className='nav-link btn btn-logout' onClick={handleLogout}>
                                Cerrar Sesión
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar
