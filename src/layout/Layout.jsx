import { Outlet } from "react-router-dom";
import './Layout.css'
import Navbar from "../components/navBar";
import Footer from "../components/Footer";

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