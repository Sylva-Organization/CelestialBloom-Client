import './Astronomy.css'
import ArticlesFront from '../components/ArticlesFront';

const Astronomy = () => {
    return (
        <>
            <section className="astronomy-section">
                <h2 className="title-astronomy">Artículos de astronomía</h2>
                <ArticlesFront categoryFilter="astronomía"></ArticlesFront>
            </section>
        </>
    )
}

export default Astronomy