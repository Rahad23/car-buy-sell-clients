import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../component/errorPage/ErrorPage";
import Home from "../component/home/Home";
import Login from "../component/login/Login";
import Register from "../component/register/Register";
import Main from './../component/main/Main';

const router = createBrowserRouter([
    {
        path:'/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children:[
            {
                path: '/',
                element:<Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path:'/register',
                element: <Register></Register>
            }
        ]
    }
])

export default router;