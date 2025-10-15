import './Botany.css'
import ArticlesFront from '../components/ArticlesFront';

const Botany = () => {
    return (
        <>
            <section className="botany-section">
                <h2 className="title-botany">Artículos de botánica</h2>
                <ArticlesFront categoryFilter="botanica"></ArticlesFront>
            </section>
        </>
    )
}

export default Botany