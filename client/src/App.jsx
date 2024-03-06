import {createBrowserRouter, RouterProvider} from "react-router-dom";

import {
    About,
    Cart,
    Checkout,
    Landing,
    Error,
    HomeLayout,
    Login,
    Orders,
    Register,
    Services,
    SingleService
} from './pages'
import {loader} from "./pages/FeaturedServices.jsx";
import {serviceLoader} from "./pages/Services.jsx";
import {singleServiceLoader} from "./pages/SingleService.jsx";
import {registerAction} from "./pages/Register.jsx";
import {loginAction} from "./pages/Login.jsx";
import {checkoutLoader} from "./pages/Checkout.jsx";
import {checkoutAction} from "./components/CheckoutForm.jsx";
import {store} from "./store.js";

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
                path: '/services/:id',
                element: <SingleService/>,
                loader: singleServiceLoader
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
                element: <Checkout/>,
                loader: checkoutLoader,
                action: checkoutAction(store)
            }
        ]
    },
    {
        path: '/login',
        element: <Login/>,
        action: loginAction
    },
    {
        path: '/register',
        element: <Register/>,
        action: registerAction
    }
])

function App() {
    return <RouterProvider router={router}/>
}

export default App
