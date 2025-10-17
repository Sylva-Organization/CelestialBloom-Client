import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home"
import Layout from "../layout/Layout"
import Astronomy from "../pages/Astronomy";
import Botany from "../pages/Botany";
import Creators from "../pages/Creators";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";
import AuthRedirect from "../components/AuthRedirect";
import ArticleDetail from "../components/ArticleDetail";
import ArticlesList from "../components/ArticlesList";
import CreateForm from "../components/CreateForm";
import EditForm from "../components/EditForm";
import UserProfile from "../pages/UserProfile";

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
            element: <AuthRedirect><SignIn/></AuthRedirect>
        },
        {
            path: "/registro",
            element: <AuthRedirect><Register/></AuthRedirect>
        },
        {
            path: "/register",
            element: <AuthRedirect><Register/></AuthRedirect>
        },
        {
            path: "/user-profile/:id",
            element: <UserProfile/>
        },
        {
            path: "/create-form",
            element: <CreateForm/>
        }, 
        {
            path: "/edit-form/:id",
            element: <EditForm/>
        }
    ]
}])

export default routerBlog;