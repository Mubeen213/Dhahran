import {Form, redirect} from "react-router-dom";
import {FormInput} from "./FormInput.jsx";
import {SubmitBtn} from "./SubmitBtn.jsx";
import {toast} from "react-toastify";
import {store} from "../store.js";
import {customFetch, formatPrice} from "../utils/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {clearCart} from "../features/cart/cartSlice.js";


export const checkoutAction = (store) => async ({request}) => {

    console.log("Checkout action begins")
    try {
        const formData = await request.formData();
        const {name, address, pickUpDate, deliveryDate, cardDetails} = Object.fromEntries(formData);
        const user = JSON.parse(localStorage.getItem('user'))
        const {cartItems, shippingFee, tax, orderTotal} = store.getState().cartState

        const payload = {
            name,
            address,
            orderTotal: formatPrice(orderTotal),
            cartItems,
            shippingFee,
            tax,
            pickUpDate,
            deliveryDate,
            cardDetails
        }

        console.log(payload)
        const {data} = await customFetch.post('/api/v1/orders/createOrder',
            payload)
        store.dispatch(clearCart())
        toast.success('Order placed successfully')
        return redirect('/orders')
    } catch (error) {
        const errorMessage =
            error?.response?.data?.error?.message ||
            'there was an error placing your order';
        toast.error(errorMessage);
        if (error?.response?.status === 401 || 403) return redirect('/login');
        return null
    }
}

export const CheckoutForm = () => {

    return (
        <Form method='POST'
              className='flex flex-col gap-y-3'>
            <h4 className='text-xl font-medium'>Shipping information: </h4>
            <FormInput
                label='Name'
                name='name'
                type='text'
            />
            <FormInput
                type='text'
                label='address'
                name='address'
            />
            <FormInput
                type='date'
                label='Select pick up date'
                name='pickUpDate'
            />
            <FormInput
                type='date'
                label='select delivery date'
                name='deliveryDate'
            />
            <FormInput
                type='text'
                label='Card details'
                name='cardDetails'
            />
            <div className='mt-4'>
                <SubmitBtn text='Place your order'/>
            </div>
        </Form>
    )
}