import './Navbar.css'
import { Link } from 'react-router-dom';
import { useAuthActions } from '../hooks/useAuthActions';

const Navbar = () => {
    // � Usar el hook personalizado para acciones de autenticación
    const { isAuthenticated, user, getUserName, handleLogout } = useAuthActions();

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
                
                {/* Solo mostrar Sign In y Register si NO está autenticado */}
                {!isAuthenticated && (
                    <>
                        <li className="menu-item">
                            <Link to="/inicio-sesion" className="nav-link btn btn-sign-in">Sign in</Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/registro" className="nav-link btn btn-register">Register</Link>
                        </li>
                    </>
                )}
                
                {/* Mostrar saludo y logout si está autenticado */}
                {isAuthenticated && (
                    <>
                        <li className="menu-item">
                            <span className="nav-link user-greeting">
                                ¡Hola, {getUserName()}! 👋
                            </span>
                        </li>
                        <li className="menu-item">
                            <button 
                                onClick={handleLogout}
                                className="nav-link btn btn-sign-in"
                                style={{ cursor: 'pointer' }}
                            >
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