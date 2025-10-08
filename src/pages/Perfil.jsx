import './Perfil.css'

const Perfil = () => {
    return (
        <>
            <section className="section-perfil">
                <h1 className='title-perfil'>Perfil</h1>
                <div className="perfil-container">
                    <h3 className='name-perfil'>Yuleisy Pacheco</h3>
                    <span className='role-perfil'>usuario</span>
                    <p className="nickname-perfil">@layulei</p>
                    <p className='email-perfil'>yuleisypa@yulei.com</p>
                </div>
                <div className="posts-container">
                    <h2 className='title-posts-client'>Mis posts</h2>
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