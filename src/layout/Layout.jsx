import { Outlet } from "react-router-dom";
import './Layout.css'
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Layout = () => {
    return (
        <>
            <NavBar />
            <main className="container-section">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout;