import { async } from "@firebase/util";
import { createBrowserRouter } from "react-router-dom";
import CarDetailsBmw from "../bmw/bmwCarDetails/CarBmwdetails";
import BmwCollection from "../bmw/BmwCollection";
import AddProduct from "../component/addProduct/AddProduct";
import AstonMartinCar from "../component/adminAllcars/astonCars/AstonMartinCar";
import AudiCars from "../component/adminAllcars/audiCars/AudiCars";
import BmwCars from "../component/adminAllcars/bmwCars/BmwCars";
import Addelete from "../component/advertisement/adDelete/Addelete";
import AdvertiseCard from "../component/advertisement/advertiseCard/AdvertiseCard";
import AllUsers from "../component/allUsers/AllUsers";
import AstonMartin from "../component/astonMartin/AstonMartin";
import AstonMartinDetailCard from "../component/astonMartin/astonMartinDetailCard/AstonMartinDetailCard";
import Audi from "../component/audi/Audi";
import AudiDetails from "../component/audi/audiDetails/AudiDetails";
import Blog from "../component/blog/Blog";
import CarDetails from "../component/carDetails/CarDetails";
import ErrorPage from "../component/errorPage/ErrorPage";
import Home from "../component/home/Home";
import Login from "../component/login/Login";
// import MyBuyers from "../component/myBuyers/MyBuyers";
import MyOrder from "../component/myOrder/MyOrder";
import MyProduct from "../component/myProduct/MyProduct";
import Payment from "../component/payment/Payment";
import PrivateRoute from "../component/privateRoute/PrivateRoute";
import Register from "../component/register/Register";
import TotalOrder from "../component/totalOrder/TotalOrder";
import Main from './../component/main/Main';
import ChackOutFrom from './../component/payment/chackOutfrom/ChackOutFrom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/BMW',
                element: <BmwCollection></BmwCollection>
            },
            {
                path: '/bmwDetail/:id',
                element: <CarDetailsBmw></CarDetailsBmw>,
                loader: async ({ params }) => await fetch(`https://car-server-eight.vercel.app/bmwDetail/${params.id}`)
            },
            {
                path: '/Audi',
                element: <Audi></Audi>
            },
            {
                path: '/AUDIdetail/:id',
                element: <AudiDetails></AudiDetails>,
                loader: async ({ params }) => await fetch(`https://car-server-eight.vercel.app/audi/${params.id}`)
            },
            {
                path: '/Aston-Martin',
                element: <AstonMartin></AstonMartin>
            },
            {
                path: '/Aston-Martin/:id',
                element: <AstonMartinDetailCard></AstonMartinDetailCard>,
                loader: async ({ params }) => await fetch(`https://car-server-eight.vercel.app/astonMartin/${params.id}`)
            },
            {
                path: '/myOrder',
                element: <PrivateRoute><MyOrder></MyOrder></PrivateRoute>
            },
            {
                path: '/addProduct',
                element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>
            },
            {
                path: '/myProduct',
                element: <PrivateRoute><MyProduct></MyProduct></PrivateRoute>
            },
            {
                path: '/users',
                element: <PrivateRoute><AllUsers></AllUsers></PrivateRoute>
            },
            {
                path: '/totalOrder',
                element: <PrivateRoute><TotalOrder></TotalOrder></PrivateRoute>
            },
            {
                path: '/adminBmw',
                element: <BmwCars></BmwCars>
            },
            {
                path: '/adminAudi',
                element: <AudiCars></AudiCars>
            },
            {
                path: '/adminAston',
                element: <AstonMartinCar></AstonMartinCar>
            },
            {
                path: '/deleteAd',
                element: <Addelete></Addelete>
            },
            {
                path: '/payment/:id',
                element: <ChackOutFrom></ChackOutFrom>,
                loader: async ({ params }) => fetch(`https://car-server-eight.vercel.app/payment/${params.id}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('myKey')}`
                    }
                })
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            }
        ]
    }
])

export default router;