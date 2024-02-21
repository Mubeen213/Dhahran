import {createBrowserRouter, RouterProvider} from "react-router-dom";

import {About, Cart, Checkout, Error, HomeLayout, Login, Orders, Register, Services, SingleService} from './pages'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout/>,
        errorElement: <Error/>,
        children: [
            {
                path: '/about',
                element: <About/>
            },
            {
                path: '/services',
                element: <Services/>
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
