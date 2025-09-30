import './Navbar.css'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return(
        <nav id='top'>
            
        </nav>
    )
}

export default Navbar;