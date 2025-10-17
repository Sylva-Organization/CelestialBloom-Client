import './Astronomy.css'
import ArticlesFront from '../components/ArticlesFront';

const Astronomy = () => {
    return (
        <>
            <section className="astronomy-section">
                <h1 className="page-title-astronomy">Explora el universo que nos rodea</h1>
                <h2 className="page-subtitle-astronomy">Aquí encontrarás todos nuestros artículos sobre astronomía, donde desentrañamos los misterios del espacio: planetas, estrellas, galaxias y mucho más.
                    Aprende, explora y deja que la curiosidad te lleve más allá de la atmósfera.</h2>
                <ArticlesFront categoryFilter="astronomia"></ArticlesFront>
            </section>
        </>
    )
}

export default Astronomy