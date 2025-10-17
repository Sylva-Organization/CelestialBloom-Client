import { useEffect, useState } from 'react';
import './ArticleDetail.css'
import { Link, useParams } from 'react-router-dom';
import { getOneArticle, deleteArticle } from '../services/ArticlesServices';
import Swal from 'sweetalert2';
import { useAuthStore } from '../store/authStore';


const ArticleDetail = () => {

    const { id } = useParams()
    const [post, setPost] = useState(null) //Empieza como null mientras se carga
    const [loading, setLoading] = useState(true)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getOneArticle(id)
                setPost(data.data)
            } catch (error) {
                console.error('Error cargando el artículo: ', error)
            } finally {
                setLoading(false)
            }
        }
        fetchPost()
    }, [id])

    const isAdmin = useAuthStore((s) => s.isAdmin?.() ?? s.roles?.includes('admin')); //


    const categoryStyles = {
        "botanica": "category-botany",
        "astronomia": "category-astronomy"
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
                    // Llama a la API para eliminar
                    await deleteArticle(postId)

                    Swal.fire({
                        title: '¡Eliminado!',
                        text: 'El post se ha borrado correctamente.',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    })

                    // Activa animación fade-out
                    setIsDeleting(true)

                    // Espera a que termine la animación y borra el post
                    setTimeout(() => {
                        setPost(null) //Ocultar el artículo sin recargar
                    }, 500)

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
    if (!post) return <p className='error-msg'>No se encontró el artículo</p>

    return (
        <>
            <article className={`article-detail-container ${isDeleting ? 'fade-out' : ''}`}>
                <div className="article-header">
                    <div className="breadcrumb">
                        <Link className='home-btn' to="/">Inicio</Link>
                        <span>›</span>
                        <span>Artículo</span>
                    </div>

                    <span className={`post-category ${categoryStyles[post.category.name.toLowerCase()] || ''}`}>{post.category.name}</span>
                    <h2 className='title-detail'>{post.title}</h2>

                    <div className="article-meta">
                        <span className='author-name'>Por: {post.author?.first_name} {post.author?.last_name}</span>
                        <p className='meta-item'>{new Date(post.createdAt).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                        })}</p>
                    </div>
                </div>

                <div className="card-detail">
                    <img src={post.image} alt="image-article" />
                    <div className="card-body-detail">
                        <p className="card-description-detail">{post.content}</p>
                        <div className="article-actions">
                            <Link to="/" className='read-more btn-back'>← Volver</Link>

                            {isAdmin && (   // 👈 aquí empieza la condición
                                <div className="action-group">
                                    <button
                                        className='action-btn delete'
                                        onClick={() => handleDelete(post.id)}
                                        disabled={isDeleting}
                                    >
                                        Eliminar
                                    </button>
                                    <Link className='action-btn edit' to={`/edit-form/${post.id}`}>Editar</Link>
                                </div>
                            )}  {/* 👈 aquí cierra la condición */}
                        </div>

                    </div>
                </div>
            </article>

        </>
    )
}

export default ArticleDetail