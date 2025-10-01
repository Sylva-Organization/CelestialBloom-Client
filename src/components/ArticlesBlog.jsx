import './ArticlesBlog.css'
import ArticlesFront from './ArticlesFront'

const ArticlesBlog = () => {
    return (
        <>
            <section className="articles-section">
                <article className="articles-container">
                    <div className='box-article astronomy-c'>
                        <h2>Astronomía</h2>
                        <ArticlesFront></ArticlesFront>
                        <ArticlesFront></ArticlesFront>
                        <ArticlesFront></ArticlesFront>
                    </div>
                    <div className='box-article botany-c'>
                        <h2>Botánica</h2>
                        <ArticlesFront></ArticlesFront>
                        <ArticlesFront></ArticlesFront>
                        <ArticlesFront></ArticlesFront>
                    </div>
                </article>
                {/* <ArticlesFront></ArticlesFront> */}
            </section>
        </>
    )
}

export default ArticlesBlog