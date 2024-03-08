import {NavLink} from "react-router-dom";

const links = [
    {
        id: 1,
        url: '/',
        text: 'home'
    },
    {
        id: 2,
        url: '/about',
        text: 'about'
    },
    {
        id: 3,
        url: '/services',
        text: 'services'
    },
    {
        id: 4,
        url: '/cart',
        text: 'cart'
    },
    {
        id: 5,
        url: '/wishlist',
        text: 'wishList'
    },
    {
        id: 6,
        url: '/orders',
        text: 'orders'
    },
]

export const NavLinks = () => {

    return (
        <>
            {
                links.map((link) => {
                    return (<li key={link.id}>
                        <NavLink to={link.url} className='capitalize'>
                            {link.text}
                        </NavLink>
                    </li>)
                })
            }
        </>
    )
}