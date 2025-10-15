import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

const Navbar = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)
  const logout = useAuthStore((state) => state.logout)

  const toggleMenu = () => setIsMenuOpen((p) => !p)
  const closeMenu = () => setIsMenuOpen(false)

  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

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
        closeMenu()
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
    <>
      <nav id='top'>
        <Link to='/' className='nav-title' onClick={closeMenu}>
          <img src='/logo.PNG' className='logo-img' alt='logo' />
        </Link>

        <div className='nav-right'>
          {!token && (
            <div className='auth-buttons'>
              <Link to='/inicio-sesion' className='nav-link btn btn-sign-in' onClick={closeMenu}>
                Sign in
              </Link>
              <Link to='/register' className='nav-link btn btn-register' onClick={closeMenu}>
                Register
              </Link>
            </div>
          )}

          <button
            type='button'
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label='Abrir menú'
            aria-expanded={isMenuOpen}
            aria-controls='mobile-menu'
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Menú de escritorio */}
        <ul className='menu desktop-menu'>
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

          {token && (
            <>
              <li className='menu-item user-info'>
                <Link
                  to={`/user-profile/${user?.id}`}
                  className='nav-link user-welcome'
                >
                  ¡Hola, {user?.firstName || user?.username || 'Usuario'}!
                </Link>
              </li>
              <li className='menu-item'>
                <button className='nav-link btn btn-logout' onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Menú móvil colgando del NavBar */}
        {isMenuOpen && (
          <div id='mobile-menu' className='mobile-menu active'>
            <ul className='mobile-menu-list'>
              <li className='mobile-menu-item'>
                <Link to='/' className='nav-link' onClick={closeMenu}>Inicio</Link>
              </li>
              <li className='mobile-menu-item'>
                <Link to='/astronomia' className='nav-link' onClick={closeMenu}>Astronomía</Link>
              </li>
              <li className='mobile-menu-item'>
                <Link to='/botanica' className='nav-link' onClick={closeMenu}>Botánica</Link>
              </li>
              <li className='mobile-menu-item'>
                <Link to='/creadoras' className='nav-link' onClick={closeMenu}>Creadoras</Link>
              </li>

              {token && (
                <>
                  <li className='mobile-menu-item user-info-mobile'>
                    <Link
                      to={`/user-profile/${user?.id}`}
                      className='nav-link user-welcome'
                      onClick={closeMenu}
                    >
                      ¡Hola, {user?.firstName || user?.username || 'Usuario'}!
                    </Link>
                  </li>
                  <li className='mobile-menu-item'>
                    <button className='nav-link btn btn-logout' onClick={handleLogout}>
                      Cerrar Sesión
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>

      {/* Overlay fuera del nav para no tapar el header */}
      {isMenuOpen && (
        <div
          className='menu-overlay active'
          onClick={closeMenu}
        />
      )}
    </>
  )
}

export default Navbar
