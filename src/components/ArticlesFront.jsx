import { useEffect, useState } from 'react';
import './ArticlesFront.css'
import { Link } from 'react-router-dom';
import { getAllArticles } from '../services/ArticlesServices';

const ArticlesFront = ({ categoryFilter }) => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllArticles()
                setPosts(data)
            } catch (error) {
                console.error('Error al cargar artículos: ', error);
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const categoryStyles = {
        "botánica": "category-botany",
        "astronomía": "category-astronomy"
    };

    const filteredPosts = categoryFilter
        ? posts.filter(
            (post) => post.categories.name.toLowerCase() === categoryFilter.toLowerCase()
        ) : posts

    if (loading) {
        return <div className='loading'>Cargando artículos...</div>
    }

    return (
        <>
            <article className="articles">
                {filteredPosts.map((post) => (
                    <div key={post.id} className='card-container'>
                        <img src={post.image} alt="foto-post" />
                        <div className="card-body">
                            <span className={`post-category ${categoryStyles[post.categories.name.toLowerCase()] || ''}`}>{post.categories.name}</span>
                            <span className="post-subcategory">{post.categories.subcategories}</span>
                            <h3 className='card-title'>{post.title}</h3>
                            <p className='card-content'>{post.content}</p>
                            <div className="post-meta">
                                <span className='post-user-author'>{post.user?.first_name} {post.user?.last_name}</span>
                                <Link to={`/articulo-detalle/${post.id}`} className='read-more'>Leer más</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </article>
        </>
    )
}

export default ArticlesFront