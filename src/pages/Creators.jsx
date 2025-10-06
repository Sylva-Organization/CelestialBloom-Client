import './Creators.css'

const Creators = () => {
    // Datos de ejemplo de creadoras
    const creators = [
        {
            id: 1,
            name: "Mariany Araujo",
            description: ".",
            image: "/mariany.png",
            category: ".",
            specialty: ".",
            github: ""
        },
        {
            id: 2,
            name: "Gabriela Hernández", 
            description: ".",
            image: "/gabriela.png",
            category: ".",
            specialty: ".",
            github: ""
        },
        {
            id: 3,
            name: "Guissella Pérez",
            description: ".",
            image: "/guissella.png",
            category: ".",
            specialty: ".",
            github: ""
        },
        {
            id: 4,
            name: "Priscelis Codrington",
            description: ".",
            image: "/priscelis.png",
            category: ".",
            specialty: ".",
            github: ""
        },
        {
            id: 5,
            name: "Paloma Gómez",
            description: ".",
            image: "/paloma.png",
            category: ".",
            specialty: ".",
            github: ""
        }
    ];

    return (
        <div className="creators-container">
            <div className="hero-section">
                <h1>Nuestras Creadoras</h1>
                <p>Conoce a las expertas que hacen posible este conocimiento</p>
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
                                <span className="creator-specialty">{creator.specialty}</span>
                            </div>
                            <p>{creator.description}</p>
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Creators