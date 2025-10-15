import { useEffect, useState } from 'react';
import './ArticlesFront.css'
import { Link } from 'react-router-dom';
import { getAllArticles } from '../services/ArticlesServices';
import { dateUtils, mockData, utils } from '../utils';

const ArticlesFront = ({ categoryFilter }) => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                utils.devLog('Cargando artículos...', 'info')
                
                // Usar mock data como respaldo si no hay artículos del servidor
                let data = []
                try {
                    data = await getAllArticles()
                    utils.devLog(`Artículos cargados del servidor: ${data.length}`, 'success')
                } catch (serverError) {
                    utils.devLog('Servidor no disponible, usando mock data', 'warning')
                    // Generar algunos artículos de ejemplo
                    data = [
                        ...mockData.articles,
                        mockData.generateRandomArticle(),
                        mockData.generateRandomArticle()
                    ]
                    utils.devLog(`Artículos mock generados: ${data.length}`, 'info')
                }
                
                setPosts(data)
            } catch (error) {
                utils.devLog('Error al cargar artículos, usando datos por defecto', 'error')
                setPosts(mockData.articles)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const categoryStyles = {
        "botánica": "category-botany",
        "botanica": "category-botany",
        "botany": "category-botany",
        "astronomía": "category-astronomy",
        "astronomia": "category-astronomy", 
        "astronomy": "category-astronomy"
    };

    // Filtrar posts por categoría si se especifica
    const filteredPosts = categoryFilter
        ? posts.filter((post) => {
            // Compatibilidad con diferentes estructuras de datos
            const category = post.categories?.name || post.category || ''
            return category.toLowerCase().includes(categoryFilter.toLowerCase())
        })
        : posts

    utils.devLog(`Posts filtrados: ${filteredPosts.length} de ${posts.length}`, 'debug')

    if (loading) {
        return <div className='loading'>Cargando artículos...</div>
    }

    return (
        <>
            <article className="articles">
                {filteredPosts.length === 0 ? (
                    <div className="no-articles-message">
                        <p>No hay artículos disponibles en esta categoría.</p>
                    </div>
                ) : (
                    filteredPosts.map((post) => {
                        // Compatibilidad con diferentes estructuras de datos
                        const category = post.categories?.name || post.category || 'general'
                        const subcategory = post.categories?.subcategories?.name || 'general'
                        const formattedDate = dateUtils.formatDate(post.date || new Date())
                        const relativeDate = dateUtils.getRelativeDate(post.date || new Date())
                        const truncatedContent = utils.truncate(post.content || post.excerpt || '', 120)
                        
                        return (
                            <div key={post.id} className='card-container'>
                                <img src={post.image || '/src/assets/parallax-photo.jpg'} alt="foto-post" />
                                <div className="card-body">
                                    <div className="card-meta">
                                        <span className={`post-category ${categoryStyles[category.toLowerCase()] || ''}`}>
                                            {utils.capitalize(category)}
                                        </span>
                                        <span className="post-date">{relativeDate}</span>
                                    </div>
                                    <h3 className='card-title'>{post.title}</h3>
                                    <p className='card-author'>Por {post.author}</p>
                                    <p className='card-content'>{truncatedContent}</p>
                                    <div className="card-footer">
                                        <span className="formatted-date">{formattedDate}</span>
                                        <Link to={`/articulo-detalle/${post.id}`} className='read-more'>Leer más</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </article>
        </>
    )
}

export default ArticlesFront