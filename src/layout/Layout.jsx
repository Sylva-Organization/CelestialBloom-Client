import { Outlet } from "react-router-dom";
import './Layout.css'
import Navbar from "../components/navBar";
import Footer from "../components/Footer";
import DevUtil from "../components/DevUtil";

const Layout = () => {
    return (
        <>
            <DevUtil />
            <Navbar />
            <main className="container-section">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout;