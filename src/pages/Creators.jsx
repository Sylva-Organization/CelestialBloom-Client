import './Creators.css'

const Creators = () => {
    // Datos de ejemplo de creadoras
    const creators = [
        {
            id: 1,
            name: "Mariany Araujo",
            description: "Desarrolladora Backend especializada en arquitectura de sistemas y gestión de bases de datos para la plataforma educativa.",
            image: "/mariany.png",
            category: "Backend Developer",
            specialty: ".",
            github: "https://github.com/marianyarj",
            linkedin: "https://www.linkedin.com/in/mariany-araujo/"
        },
        {
            id: 2,
            name: "Gabriela Hernández", 
            description: "Ingeniera Backend enfocada en el desarrollo de APIs y servicios web que impulsan las funcionalidades del proyecto.",
            image: "/gabriela.png",
            category: "Backend Developer",
            specialty: ".",
            github: "https://github.com/gabriela-her",
            linkedin: "https://www.linkedin.com/in/gabriela-hernandez-67aa491b3/"
        },
        {
            id: 3,
            name: "Guissella Pérez",
            description: "Desarrolladora Frontend especializada en crear interfaces intuitivas y experiencias de usuario atractivas.",
            image: "/guissella.png",
            category: "Frontend Developer",
            specialty: ".",
            github: "https://github.com/guiss26",
            linkedin: "https://www.linkedin.com/in/guissella-pérez/"
        },
        {
            id: 4,
            name: "Priscelis Codrington",
            description: "Desarrolladora Backend con experiencia en infraestructura tecnológica y optimización de sistemas.",
            image: "/priscelis.png",
            category: "Backend Developer",
            specialty: ".",
            github: "https://github.com/priscelis",
            linkedin: "https://www.linkedin.com/in/priscelis-codrington-5195b0206/"
        },
        {
            id: 5,
            name: "Paloma Gómez",
            description: "Diseñadora y Desarrolladora Frontend dedicada a construir interfaces modernas y funcionales.",
            image: "/paloma.png",
            category: "Frontend Developer",
            specialty: ".",
            github: "https://github.com/Pal-cloud",
            linkedin: "https://www.linkedin.com/in/palomagsal/"
        }
    ];

    return (
        <div className="creators-container">
            <div className="hero-section">
                <h1>Creadoras que iluminan el cosmos y cultivan ideas</h1>
                <p>Conoce a las mujeres que dan vida a este jardín estelar de conocimientos</p>
            </div>
            
            <div className="creators-grid">
                {creators.map((creator) => (
                    <div key={creator.id} className="creator-card">
                        <div className="creator-image">
                            <img src={creator.image} alt={creator.name} />
                        </div>
                        <div className="creator-content">
                            <h3>{creator.name}</h3>
                            <div className="creator-tags">
                                <span className="creator-category">{creator.category}</span>
                            </div>
                            <p>{creator.description}</p>
                            <div className="creator-buttons">
                                <a 
                                    href={creator.github} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="creator-btn github-btn"
                                >
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                    GitHub
                                </a>
                                <a 
                                    href={creator.linkedin} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="creator-btn linkedin-btn"
                                >
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Creators