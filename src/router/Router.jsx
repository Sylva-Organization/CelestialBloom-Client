import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home"
import Layout from "../layout/Layout"
import Astronomy from "../pages/Astronomy";
import Botany from "../pages/Botany";
import Creators from "../pages/Creators";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import ArticleDetail from "../components/ArticleDetail";
import ArticlesList from "../components/ArticlesList";

const routerBlog = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    children: [
        {
            index: true,
            element: <Home/>
        },
        {
            path: "/articulos",
            element: <ArticlesList/>
        },
        {
            path: "/articulo-detalle/:id",
            element: <ArticleDetail/>
        },
        {
            path: "/astronomia",
            element: <ProtectedRoute><Astronomy/></ProtectedRoute>
        },
        {
            path: "/botanica",
            element: <ProtectedRoute><Botany/></ProtectedRoute>
        },
        {
            path: "/creadoras",
            element: <ProtectedRoute><Creators/></ProtectedRoute>
        },
        {
            path: "/inicio-sesion",
            element: <SignIn/>
        },
        {
            path: "/registrarse",
            element: <Register/>
        },
    ]
}])

export default routerBlog;