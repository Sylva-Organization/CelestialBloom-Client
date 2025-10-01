import './Creators.css'

const Creators = () => {
    // Datos de ejemplo de creadoras
    const creators = [
        {
            id: 1,
            name: "María González",
            description: "Especialista en astronomía observacional con más de 10 años de experiencia. Apasionada por compartir el conocimiento del cosmos.",
            image: "/api/placeholder/300/200",
            category: "Astronomía",
            specialty: "Observación"
        },
        {
            id: 2,
            name: "Ana Martínez", 
            description: "Botánica especializada en plantas medicinales y ecosistemas tropicales. Defensora de la conservación ambiental.",
            image: "/api/placeholder/300/200",
            category: "Botánica",
            specialty: "Plantas Medicinales"
        },
        {
            id: 3,
            name: "Carmen López",
            description: "Astrofísica teórica enfocada en el estudio de agujeros negros y relatividad general. Divulgadora científica activa.",
            image: "/api/placeholder/300/200",
            category: "Astrofísica",
            specialty: "Teoría"
        },
        {
            id: 4,
            name: "Laura Rodríguez",
            description: "Investigadora en ecología vegetal y cambio climático. Especialista en adaptación de plantas a condiciones extremas.",
            image: "/api/placeholder/300/200",
            category: "Ecología",
            specialty: "Cambio Climático"
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