import { useParams } from 'react-router-dom';
import { getOneUser, getUserPosts } from '../services/UsersServices';
import './UserProfile.css'
import { useEffect, useState } from 'react';

const UserProfile = () => {
    const { id } = useParams()
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getOneUser(id)
                const userPosts = await getUserPosts(id)

                setUser(userData)
                console.log("ID desde useParams", id)
                setPosts(userPosts)
            } catch (error) {
                console.error('Error cargando datos del usuario: ', error)
            } finally {
                setLoading(false)
            }
        }
        if (id) fetchUserData()
    }, [id])

    const categoryStyles = {
        "botánica": "category-botany",
        "astronomía": "category-astronomy"
    };

    if (loading) return <></>
    if (!user) return <p>No se encontró el usuario</p>

    return (
        <>
            <section className="section-perfil-user">
                {/* Info user  */}
                <div className='perfil-container'>
                    <div className="perfil-role">
                        <h2 className='title-perfil'>Mi Perfil</h2>
                        <span className='role-perfil'>{user.role}</span>
                    </div>
                    <hr />
                    <div className="campos-user">
                        <div className="campos-item">
                            <span className="user-label">NOMBRE</span>
                            <p className="user-name">{user.first_name}</p>
                        </div>
                        <div className="campos-item">
                            <span className="user-label">APELLIDOS</span>
                            <p className="user-lastname">{user.last_name}</p>
                        </div>
                        <div className="campos-item">
                            <span className="user-label">CORREO ELECTRÓNICO</span>
                            <p className="user-email">{user.email}</p>
                        </div>
                        <div className="campos-item">
                            <span className="user-label">NICKNAME</span>
                            <p className="user-nickname">{user.nick_name}</p>
                        </div>
                    </div>
                </div>

                {/* User posts  */}
                <div className='mis-posts-container'>
                    <h2 className="title-mis-post">Mis posts</h2>
                    <hr />
                    <div className="posts-box">
                        {posts.length === 0 ? (
                            <p>Este usuario no todavía no tiene posts.</p>
                        ) : (
                            posts.map((post) => (
                                <div key={post.id} className="posts-client">
                                    <img src={post.image} alt={post.title} />
                                    <span className={`post-category ${categoryStyles[post.categories.name.toLowerCase()] || ''}`}>{post.categories.name}</span>
                                    <h3 className='title-client-article'>{post.title}</h3>
                                    <p className='date-post'>{new Date(post.createdAt).toLocaleDateString('es-ES', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default UserProfile