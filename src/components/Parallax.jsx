import './Parallax.css'
import { useEffect, useState } from "react";

const Parallax = () => {
    const [offsetY, setOffsetY] = useState(0)

    const handleScroll = () => setOffsetY(window.scrollY)

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <section className="parallax-section">
                <figure className='parallax-container' style={{ backgroundPositionY: `${offsetY * 0.5}px`}}>
                    <h1 className='parallax-title'>CelestialBloom: Blog de astronomía y botánica</h1>
                </figure>
            </section>

        </>
    )
}

export default Parallax