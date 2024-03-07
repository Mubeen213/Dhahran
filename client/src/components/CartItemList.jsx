import {useSelector} from "react-redux";
import {CartItem} from "./CartItem.jsx";


export const CartItemList = ({cartItems}) => {
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