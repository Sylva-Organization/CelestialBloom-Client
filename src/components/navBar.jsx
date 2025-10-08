import './Navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {
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
                <li className="menu-item">
                    <Link to="/inicio-sesion" className="nav-link btn btn-sign-in">Sign in</Link>
                </li>
                <li className="menu-item">
                    <Link to="/registro" className="nav-link btn btn-register">Register</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;