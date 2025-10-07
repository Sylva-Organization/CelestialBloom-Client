import { useEffect, useState } from 'react';
import './ArticleDetail.css'
import { Link, useParams } from 'react-router-dom';
import { getOneArticle } from '../services/ArticlesServices';

const ArticleDetail = () => {

    const { id } = useParams()
    const [post, setPost] = useState(null) //Empieza como null mientras se carga
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getOneArticle(id)
                setPost(data)
            } catch (error) {
                console.error('Error cargando el artículo: ', error)
            } finally {
                setLoading(false)
            }
        }
        fetchPost()
    }, [id])

    const categoryStyles = {
        "botánica": "category-botany",
        "astronomía": "category-astronomy"
    };

    if (loading) return <></>
    if (!post) return <p>No se encontró el artículo</p>

    return (
        <>
            <article className='article-detail-container'>
                <div className="card-detail">
                    <h3 className='title-detail'>{post.title}</h3>
                    <img src={post.image} alt="image-article" />
                    <div className="card-body-detail">
                        <span className={`post-category ${categoryStyles[post.categories.name.toLowerCase()] || ''}`}>{post.categories.name}</span>
                        <span className="post-subcategory">{post.categories.subcategories.name}</span>
                        <p className="card-description-detail">{post.content}</p>
                        <Link to="/" className='read-more btn-back'>Volver</Link>
                    </div>
                </div>
            </article>

        </>
    )
}

export default ArticleDetail