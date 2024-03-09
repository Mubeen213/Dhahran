import {Form, redirect} from "react-router-dom";
import {FormInput} from "./FormInput.jsx";
import {SubmitBtn} from "./SubmitBtn.jsx";
import {toast} from "react-toastify";
import {customFetch, formatPrice} from "../utils/index.jsx";
import {clearCart} from "../features/cart/cartSlice.js";
import acceptedCards from "../assets/cards-img.jpeg";

export const checkoutAction = (store) => async ({request}) => {

    console.log("Checkout action begins")
    try {
        const formData = await request.formData();
        const {name, address, pickUpDate, deliveryDate, cardDetails, cvv, expiry} = Object.fromEntries(formData);
        const user = JSON.parse(localStorage.getItem('user'))
        const {cartItems, shippingFee, tax, orderTotal} = store.getState().cartState
        console.log("cart items " + cartItems)
        const payload = {
            name,
            address,
            orderTotal: formatPrice(orderTotal),
            cartItems,
            shippingFee,
            tax,
            pickUpDate,
            deliveryDate,
            cardDetails,
            cvv,
            expiry,
        }
        const {data} = await customFetch.post('/api/v1/orders/createOrder',
            payload)
        store.dispatch(clearCart())
        toast.success('Order placed successfully')
        return redirect('/orders')
    } catch (error) {
        const errorMessage =
            error?.response?.data?.msg ||
            'There was an error placing your order';
        toast.error(errorMessage);
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
            <div className= 'form-control'>
                <label className= 'label'>
                <span className= 'label-text capitalize'>
                   Card details
                </span>
                    <img
                        src={acceptedCards}
                        className='w-2/4 m-0 bg-base-200 p-0 gap-0'
                        alt='mada-card'/>
                </label>
                <input
                    type='text'
                    name='cardDetails'
                    className= {`input input-bordered`}
                    required
                />
            </div>
            <div className='form-control'>
                <label className='label'>
                <span className='label-text capitalize'>
                    CVV
                </span>
                </label>
                <input
                    type='tel'
                    name='cvv'
                    maxLength="3"
                    className={`input input-bordered sm:input-sm`}
                    required
                />
            </div>
            <div className='form-control'>
                <label className='label'>
                <span className='label-text capitalize'>
                    Expiry
                </span>
                </label>
                <input
                    type="text" id="expiry" name="expiry" pattern="\d\d/\d\d" maxLength="5" placeholder="MM/YY"
                    className={`input input-bordered sm:input-sm`}
                    required
                />
            </div>
            <div className='mt-4'>
                <SubmitBtn text='Place your order'/>
            </div>
        </Form>
    )
}