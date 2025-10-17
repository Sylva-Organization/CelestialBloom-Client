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
                <div className="parallax-container">
                    <video src="src/assets/parallax-video.mp4" className="parallax-video" autoPlay loop muted playsInline style={{ transform: `translateY(${offsetY * 0.5}px)`}}></video>
                    <h1 className='parallax-title'>CelestialBloom: Blog de astronomía y botánica</h1>
                </div>
            </section>

        </>
    )
}

export default Parallax