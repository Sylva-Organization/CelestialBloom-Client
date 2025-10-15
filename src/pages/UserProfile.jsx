import { useParams, Link } from 'react-router-dom';
import { getOneUser, getUserPosts } from '../services/UsersServices';
import './UserProfile.css'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { deleteArticle } from '../services/ArticlesServices';
import { useAuthStore } from '../store/authStore';

const UserProfile = () => {
    const { id } = useParams()
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [deletingPosts, setDeletingPosts] = useState([])

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getOneUser(id)
                const userPosts = await getUserPosts(id)
                // console.log(userData);
                // console.log(userPosts);
                setUser(userData.data)
                //console.log("ID desde useParams", id)
                setPosts(userPosts.data)
                //console.log(userData.data.posts)
            } catch (error) {
                console.error('Error cargando datos del usuario: ', error)
            } finally {
                setLoading(false)
            }
        }
        if (id) fetchUserData()
    }, [id])

    const isAdmin = useAuthStore((s) => s.isAdmin?.() ?? s.roles?.includes('admin'));

    const categoryStyles = {
        "botánica": "category-botany",
        "astronomía": "category-astronomy"
    };

    const handleDelete = (postId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el artículo permanentemente.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Marca el post como en eliminación para animación
                    setDeletingPosts(prev => [...prev, postId])

                    // Llama a la API para eliminar
                    await deleteArticle(postId)

                    //Animación fade-out
                    setTimeout(() => {
                        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId))
                        setDeletingPosts(prev => prev.filter(id => id !== postId))
                    }, 500)

                    Swal.fire({
                        title: '¡Eliminado!',
                        text: 'El post se ha borrado correctamente.',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    })

                } catch (error) {
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudo eliminar el post.',
                        icon: 'error'
                    })
                    console.error(error)
                }
            }
        })
    }

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
                {isAdmin &&(
                <div className='mis-posts-container'>
                    <h2 className="title-mis-post">Mis posts</h2>
                    <hr />
                    <div className="posts-box">
                        {posts.length === 0 ? (
                            <p>Este usuario no todavía no tiene posts.</p>
                        ) : (
                            posts.map((post) => (
                                <div key={post.id} className={`posts-client ${deletingPosts.includes(post.id) ? 'removed' : ''}`}>
                                    <img src={post.image} alt={post.title} />
                                    <span className={`post-category ${categoryStyles[post.category?.name.toLowerCase()] || ''}`}>
                                        {post.category?.name || 'Sin categoría'}
                                    </span>
                                    <h3 className='title-client-article'>{post.title}</h3>
                                    <hr />
                                    <div className="post-meta">
                                        <p className='date-post'>{new Date(post.createdAt).toLocaleDateString('es-ES', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        })}</p>

                                        <div className="post-actions">
                                            <button className='action-btn delete' onClick={() => handleDelete(post.id)}>Eliminar</button>
                                            <Link className='action-btn edit' to={`/edit-form/${post.id}`}>Editar</Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                )}
            </section>
        </>
    )
}

export default UserProfile