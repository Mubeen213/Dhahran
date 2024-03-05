import service1 from '../assets/service1.jpeg'
import {formatPrice, generateAmountOptions} from "../utils/index.jsx";
import {useDispatch} from "react-redux";
import {editItem, removeItem} from "../features/cart/cartSlice.js";

export const CartItem = ({cartItem}) => {

    const dispatch = useDispatch();

    const {cartID, name, price, amount} = cartItem

    const handleAmount = (e) => {
        e.preventDefault()
        dispatch(editItem({cartID, amount: parseInt(e.target.value)}))
    }

    const removeItemFromCart = () => {
        dispatch(removeItem({cartID}))
    }

    return (
        <article key={cartID}
                 className='mb-12 flex
                  flex-col gap-y-4
                   sm:flex-row flex-wrap
                   border-b border-base-300 pb-6 last:border-b-0'
        >
            <img
                src={service1}
                className='h-36 w-40 object-cover rounded-lg'
                alt='Service-img'/>
            <div className='sm:ml-16 sm:w-48'>
                <h4 className='text-2xl mt-2
             font-medium tracking-tight'>{name}</h4>
            </div>
            <div className='sm:ml-12'>
                <div className='form-control'>
                    <label htmlFor='amount' className='label'>
                        <span className='label-text'>Amount</span>
                    </label>
                    <select
                        name='amount'
                        id='amount'
                        onChange={handleAmount}
                        value={amount}
                        className='select select-base select-bordered select-xs'
                    >
                        {generateAmountOptions(amount + 5)}
                    </select>
                </div>
                <button
                    className='link link-primary
                     mt-2 link-hover text-sm'
                    onClick={removeItemFromCart}>
                    remove
                </button>
            </div>
            <p className= 'font-medium sm:ml-auto'>
                {formatPrice(price)}
            </p>
        </article>
    )
}