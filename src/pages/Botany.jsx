import './Botany.css'
import ArticlesFront from '../components/ArticlesFront';

const Botany = () => {
    return (
        <>
            <section className="botany-section">
                <h1 className="page-title-botany">Descubre la vida que florece en la Tierra</h1>
                <h2 className="page-subtitle-botany">Aquí encontrarás todos los artículos dedicados a la botánica — el estudio de las plantas, su estructura, crecimiento y belleza natural.
                    Desde las raíces hasta las copas de los árboles, explora cómo la vida verde sostiene nuestro planeta.</h2>
                <ArticlesFront categoryFilter="botanica"></ArticlesFront>
            </section>
        </>
    )
}

export default Botany