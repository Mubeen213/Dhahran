import {useSelector} from "react-redux";
import SectionTitle from "../components/SectionTitle.jsx";
import {CartItemList} from "../components/CartItemList.jsx";
import {CartTotals} from "../components/CartTotals.jsx";


const Cart = () => {

    const user = null

    const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart)

    if (numItemsInCart === 0) {
        return <SectionTitle text='Your cart is Empty'/>
    }

    return (
        <>
           <SectionTitle text='Shopping cart'/>
            <div className='mt-8 grid gap-8 lg:grid-cols-12'>
                <div className= 'lg:col-span-8'>
                    <CartItemList/>
                </div>
                <div className= 'lg:col-span-4 lg:pl-4'>
                    <CartTotals/>
                </div>
            </div>
        </>
    )
}

export default Cart;