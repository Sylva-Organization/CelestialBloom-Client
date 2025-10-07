import './ArticlesList.css'
import ArticlesFront from './ArticlesFront'
import { Link } from 'react-router-dom';

const ArticlesList = ({ users }) => {
    return (
        <>
            <section className="filter-tabs">
                <div className="container-tab">
                    <div className="tab-buttons">
                        <Link to="/" className='tab-btn active' data-filter="todos">Todos los Posts</Link>
                        <Link to="/astronomia" className='tab-btn' data-filter="astronomia">Astronomía</Link>
                        <Link to="/botanica" className='tab-btn' data-filter="botanica">Botánica</Link>
                    </div>
                </div>
            </section>

            <section className="articles-section">
                <article className="articles-container">
                    <div className='box-article'>
                        <h2>Artículos</h2>
                            <ArticlesFront></ArticlesFront>
                    </div>
                </article>
            </section>
        </>
    )
}

export default ArticlesList