import {toast} from "react-toastify";
import {redirect} from "react-router-dom";
import {CheckoutForm} from "../components/CheckoutForm.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import {CartTotals} from "../components/CartTotals.jsx";


export const checkoutLoader = async () => {

    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) {
        toast.warn('You must be logged in to checkout')
        return redirect('/login')
    }

    return null
}
const Checkout = () => {

    return (
        <>
            <SectionTitle text='place your order'/>
            <div className='mt-8 grid gap-8 md:grid-cols-2 items-start'>
                <CheckoutForm/>
                <CartTotals/>
            </div>
        </>
    )
}

export default Checkout;