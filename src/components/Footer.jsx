import './Footer.css'
import { Link } from 'react-router-dom';

const Footer = () => {
    return(
        <footer className="footer-container">
            <div className="footer-content">
                <p className="footer-text">
                    Este proyecto ha sido creado por las <strong>FemCoders Madrid</strong> del 
                    <strong> Bootcamp de Desarrollo Web FullStack</strong> de 
                    <Link 
                        to="https://factoriaf5.org/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="footer-link"
                    > Factoría F5</Link>.
                </p>
                <p>© Copyright 2025</p>
            </div>

            <div className="footer-logo">
                <Link to="https://factoriaf5.org/" target="_blank" rel="noopener noreferrer">
                    <img src="/logo-factoria.PNG" alt="Logo Factoría F5" />
                </Link>
            </div>
        </footer>
    )
}

export default Footer;