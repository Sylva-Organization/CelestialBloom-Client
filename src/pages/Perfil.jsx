import './Perfil.css'

const Perfil = () => {
    return (
        <>
            <section className="section-perfil-user">
                <div className='perfil-container'>
                    <div className="perfil-role">
                        <h2 className='title-perfil'>Mi Perfil</h2>
                        <span className='role-perfil'>usuario</span>
                    </div>
                    <hr />
                    <div className="campos-user">
                        <div className="campos-item">
                            <span className="user-label">NOMBRE</span>
                            <p className="user-name">Yuleisy</p>
                        </div>
                        <div className="campos-item">
                            <span className="user-label">APELLIDOS</span>
                            <p className="user-lastname">Pacheco Pérez</p>
                        </div>
                        <div className="campos-item">
                            <span className="user-label">CORREO ELECTRÓNICO</span>
                            <p className="user-email">yuleisypach@yuleisy.com</p>
                        </div>
                        <div className="campos-item">
                            <span className="user-label">NICKNAME</span>
                            <p className="user-nickname">@layulei</p>
                        </div>
                    </div>
                </div>
                <div className='mis-posts-container'>
                    <h2 className="title-mis-post">Mis posts</h2>
                    <hr />
                    <div className="posts-box">
                        <div className="posts-client">
                            <img src="src/assets/parallax-photo.jpg" alt="image-post" />
                            <h3 className='title-client-article'>Título</h3>
                            <p className='date-post'>12 Sept 2025</p>
                        </div>
                        <div className="posts-client">
                            <img src="src/assets/parallax-photo.jpg" alt="image-post" />
                            <h3 className='title-client-article'>Título</h3>
                            <p className='date-post'>12 Sept 2025</p>
                        </div>
                        <div className="posts-client">
                            <img src="src/assets/parallax-photo.jpg" alt="image-post" />
                            <h3 className='title-client-article'>Título</h3>
                            <p className='date-post'>12 Sept 2025</p>
                        </div>
                        <div className="posts-client">
                            <img src="src/assets/parallax-photo.jpg" alt="image-post" />
                            <h3 className='title-client-article'>Título</h3>
                            <p className='date-post'>12 Sept 2025</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Perfil