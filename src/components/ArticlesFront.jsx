import ArticleDetail from './ArticleDetail'
import './ArticlesFront.css'
import { Link } from 'react-router-dom';

const ArticlesFront = () => {
    return (
        <>
            <article className="articles">
                <div className='card-container'>
                    <img src="../src/assets/parallax-photo.jpg" alt="parallax-photo" />
                    <div className="card-body">
                        <h3 className='card-title'>Title</h3>
                        <p className='card-paragraph'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus aliquid quaerat similique velit impedit est reprehenderit asperiores officia excepturi! Hic ab quas, distinctio sequi voluptas eius quis exercitationem aliquam velit.
                        </p>
                        {/* <Link to={`/articulo-detalle/${butterfly.id}`}></Link> */}
                        <Link to="/articulo-detalle/:id" className='read-more'>Leer más</Link>
                    </div>
                </div>
            </article>

        </>
    )
}

export default ArticlesFront