import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home"
import Layout from "../layout/Layout"
import Astronomy from "../pages/Astronomy";
import Botany from "../pages/Botany";
import Creators from "../pages/Creators";
import SignIn from "../pages/SignIn";
import RegisterRedirect from "../components/RegisterRedirect";
import ArticlesBlog from "../components/ArticlesBlog";
import ArticleDetail from "../components/ArticleDetail";

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
            element: <ArticlesBlog/>
        },
        {
            path: "/articulo-detalle/:id",
            element: <ArticleDetail/>
        },
        {
            path: "/astronomia",
            element: <Astronomy/>
        },
        {
            path: "/botanica",
            element: <Botany/>
        },
        {
            path: "/creadoras",
            element: <Creators/>
        },
        {
            path: "/inicio-sesion",
            element: <SignIn/>
        },
        {
            path: "/registro",
            element: <RegisterRedirect/>
        },
    ]
}])

export default routerBlog;