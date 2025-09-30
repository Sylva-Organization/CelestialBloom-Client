import { Outlet } from "react-router-dom";
import './Layout.css'

const Layout = () => {
    return (
        <>
            <Navbar />
            <main className="container-section">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout;