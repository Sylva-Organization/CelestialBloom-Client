import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useAuthStore from '../stores/authStore';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user, isAuthenticated, logout: contextLogout } = useAuth();
    const { logout: storeLogout } = useAuthStore();
    const navigate = useNavigate();

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
                // Cerrar sesión en ambos sistemas
                contextLogout();
                storeLogout();
                
                // Mostrar mensaje de confirmación
                Swal.fire({
                    title: '¡Sesión cerrada!',
                    text: 'Has cerrado sesión exitosamente.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
                
                // Redirigir al inicio
                navigate('/');
            }
        });
    };

    return(
        <nav id='top'>
            <Link to="/" className="nav-title"><img src="/logo.PNG" className='logo-img' alt="logo" /></Link>

            {/**Botón hambburguesa */}
            {/* <button className="hamburguer-button">☰</button> */}

            <ul className="menu">
                <li className="menu-item">
                    <Link to="/" className="nav-link">Inicio</Link>
                </li>
                <li className="menu-item">
                    <Link to="/astronomia" className="nav-link">Astronomía</Link>
                </li>
                <li className="menu-item">
                    <Link to="/botanica" className="nav-link">Botánica</Link>
                </li>
                <li className="menu-item">
                    <Link to="/creadoras" className="nav-link">Creadoras</Link>
                </li>
                
                {/* Mostrar botones de autenticación solo si NO está autenticado */}
                {!isAuthenticated && (
                    <>
                        <li className="menu-item">
                            <Link to="/inicio-sesion" className="nav-link btn btn-sign-in">Sign in</Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/register" className="nav-link btn btn-register">Register</Link>
                        </li>
                    </>
                )}
                
                {/* Mostrar opciones cuando está autenticado */}
                {isAuthenticated && (
                    <>
                        <li className="menu-item user-info">
                            <span className="nav-link user-welcome">
                                ¡Hola, {user?.firstName || user?.username || 'Usuario'}! 👋
                            </span>
                        </li>
                        <li className="menu-item">
                            <button className="nav-link btn btn-logout" onClick={handleLogout}>
                                Cerrar Sesión
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar;