import {useSelector} from "react-redux";
import {CartItem} from "./CartItem.jsx";


export const CartItemList = () => {
    const cartItems = useSelector((state) => state.cartState.cartItems)
    return (
        <>
            {
                cartItems.map((cartItem) => {
                    return (
                        <CartItem cartItem={cartItem} key={cartItem.cartID}/>
                    )
                })
            }
        </>
    )
}