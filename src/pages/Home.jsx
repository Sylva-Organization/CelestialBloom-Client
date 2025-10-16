import { useEffect, useState } from 'react'
import ArticlesList from '../components/ArticlesList'
import Parallax from '../components/Parallax'
import './Home.css'
import { useAuthStore } from '../store/authStore'

const Home = () => {
    const user = useAuthStore((state) => state.user)
    const token = useAuthStore((state) => state.token)

    const isLogged = Boolean(user && token)
    
    return (
        <>
            <Parallax></Parallax>
            
            {!isLogged ? (
                <section className="welcome-section">
                    <h1 className="welcome-title">Bienvenido a nuestro blog</h1>
                    <p className="welcome-text">Explora los artículos de astronomía y botánica. Inicia sesión o regístrate para acceder al contenido completo.</p>
                </section>
            ) : (
                <ArticlesList></ArticlesList>
            )}
            {/* <ArticlesList></ArticlesList> */}
        </>
    )
}

export default Home