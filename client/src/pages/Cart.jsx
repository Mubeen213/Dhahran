import {useSelector} from "react-redux";
import SectionTitle from "../components/SectionTitle.jsx";
import {CartItemList} from "../components/CartItemList.jsx";
import {CartTotals} from "../components/CartTotals.jsx";
import {Link} from "react-router-dom";


const Cart = () => {

    const user = JSON.parse(localStorage.getItem('user'))
    const cartItems = useSelector((state) => state.cartState.cartItems)

    const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart)

    if (numItemsInCart === 0) {
        return <SectionTitle text='Your cart is Empty'/>
    }

    return (
        <>
            <SectionTitle text='Shopping cart'/>
            <div className='mt-8 grid gap-8 lg:grid-cols-12'>
                <div className='lg:col-span-8'>
                    <CartItemList cartItems={cartItems}/>
                </div>
                <div className='lg:col-span-4 lg:pl-4'>
                    <CartTotals/>
                    <div className='mt-4'>
                        <Link
                            to={user ? '/checkout' : '/login'}
                            className='btn btn-primary btn-block'>
                            {
                                user ? 'Proceed to checkout' : 'Login to checkout'
                            }
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;