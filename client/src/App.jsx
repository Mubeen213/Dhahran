import {createBrowserRouter, RouterProvider} from "react-router-dom";

import {About, Cart, Checkout, Landing, Error, HomeLayout, Login, Orders, Register, Services, SingleService} from './pages'
import {loader} from "./pages/FeaturedServices.jsx";
import {serviceLoader} from "./pages/Services.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout/>,
        errorElement: <Error/>,
        children: [
            {
                index: true,
                element: <Landing/>,
                loader: loader
            },
            {
                path: '/about',
                element: <About/>
            },
            {
                path: '/services',
                element: <Services/>,
                loader: serviceLoader
            },
            {
                path: '/singleService',
                element: <SingleService/>
            },
            {
                path: '/orders',
                element: <Orders/>
            },
            {
                path: '/cart',
                element: <Cart/>
            },
            {
                path: '/checkout',
                element: <Checkout/>
            }
        ]
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    }
])

function App() {
    return <RouterProvider router={router}/>
}

export default App
