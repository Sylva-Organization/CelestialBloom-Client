import './Creators.css'

const Creators = () => {
    // Datos de ejemplo de creadoras
    const creators = [
        {
            id: 1,
            name: "Mariany Araujo",
            description: ".",
            image: "/api/placeholder/300/200",
            category: ".",
            specialty: "."
        },
        {
            id: 2,
            name: "Gabriela Hernández", 
            description: ".",
            image: "/api/placeholder/300/200",
            category: ".",
            specialty: "."
        },
        {
            id: 3,
            name: "Guissella Pérez",
            description: ".",
            image: "/api/placeholder/300/200",
            category: ".",
            specialty: "."
        },
        {
            id: 4,
            name: "Priscelis Codrington",
            description: ".",
            image: "/api/placeholder/300/200",
            category: ".",
            specialty: "."
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
                            <button className="creator-btn">Ver Perfil</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Creators