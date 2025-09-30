import './Footer.css'
import { Link } from 'react-router-dom';

const Footer = () => {
    return(
        <footer>
            <div className="rrss"></div>
            <div className='astronomy-box-footer'>
                <ul>
                    <h3 className='title-footer'>Astronomía</h3>

                    <li>UI design</li>
                    <li>UX design</li>
                    <li>Wireframing</li>
                    <li>Diagramming</li>
                    <li>Brainstorming</li>
                    <li>Online whiteboard</li>
                    <li>Team collaboration</li>
                </ul>
            </div>
            <div className='botany-box-footer'>
                <ul>
                    <h3 className='title-footer'>Botánica</h3>
                    
                    <li>Design</li>
                    <li>Prototyping</li>
                    <li>Development features</li>
                    <li>Desing systems</li>
                    <li>Collaboration features</li>
                    <li>Design process</li>
                    <li>FigJam</li>
                </ul>
            </div>
            <div className="logo-factoria">
                <Link to="https://factoriaf5.org/"><img src="/logo-factoria.PNG" alt="logo-factoria-F5" /></Link>
            </div>
        </footer>
    )
}

export default Footer;