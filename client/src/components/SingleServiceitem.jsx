import {formatPrice, generateAmountOptions} from "../utils/index.jsx";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addItem} from "../features/cart/cartSlice.js";
import {addItemToWishList} from "../features/wishlist/wishListSlice.js";


export const SingleServiceItem = ({serviceItem}) => {

    const {_id, name, price, image} = serviceItem

    const [amount, setAmount] = useState(1);

    const handleAmount = (e) => {
        setAmount(parseInt(e.target.value));
    };

    const dispatch = useDispatch();
    const cartService = {
        cartID: _id,
        name,
        price,
        amount,
        image
    }

    const wishLIstService = {
        wishListID: _id,
        name,
        price,
        image
    }

    const addToCart = () => {
        dispatch(addItem({service: cartService}))
    }

    const addToWishList = () => {
        dispatch(addItemToWishList({service: wishLIstService}))
    }

    return (
        <article className='flex flex-col md:flex-row
              bg-white shadow-md rounded-box p-4 mt-8 gap-x-4'>
            <img src={`http://localhost:5001${image}`} alt='service-img'
                 className='w-38 h-40 bg-base-200 rounded-box object-cover '/>
            <div className='flex flex-col gap-3 flex-wrap  leading-normal'>
                <h3 className='mb-1 text-xl flex flex-wrap'>
                    <span className='font-medium'> Name: </span>
                    {name}
                </h3>
                <p className='mb-1 text-xl '>
                    <span className='font-medium'>  Price: </span>
                    {formatPrice(price)}
                </p>
                <select
                    className='select select-secondary select-bordered select-sm'
                    id='amount'
                    value={amount}
                    onChange={handleAmount}
                >
                    {generateAmountOptions(20)}
                </select>
                <div className='flex flex-row flex-wrap gap-2'>
                    <button onClick={addToCart}
                            className='btn btn-secondary w-28'>
                        Add to cart
                    </button>
                    <button onClick={addToWishList}
                            className='btn btn-secondary w-28'>
                         Wishlist
                    </button>
                </div>
            </div>
        </article>
    )

}