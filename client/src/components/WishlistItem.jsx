import imagesMap, {formatPrice} from "../utils/index.jsx";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addItem} from "../features/cart/cartSlice.js";
import {removeItemFromWishList} from "../features/wishlist/wishListSlice.js";


export const WishlistItem = ({wishlistItem}) => {

    const {wishListID, name, price} = wishlistItem
    const dispatch = useDispatch()
    const cartService = {
        cartID: wishListID,
        name,
        price,
        amount: 1
    }

    const addItemToCart = () => {
        dispatch(addItem({service: cartService}))
        dispatch(removeItemFromWishList({wishListID}))
    }

    const removeFromWishlist = () => {
        dispatch(removeItemFromWishList({wishListID}))
    }

    return (
        <article className='flex flex-col md:flex-row
              bg-white shadow-md rounded-box p-4 mt-6 gap-x-4'>
            <Link to={`/services/${wishListID}`}>
                <img src={imagesMap.get(wishListID)} alt='service-img'
                     className='w-38 h-40 bg-base-200 rounded-box object-cover '/>
            </Link>
            <div className='flex flex-col gap-2 flex-wrap  leading-normal'>
                <h3 className='mb-1 text-xl flex flex-wrap'>
                    <span className='font-medium'> Name: </span>
                    {name}
                </h3>
                <p className='mb-1 text-xl '>
                    <span className='font-medium'>  Price: </span>
                    {formatPrice(price)}
                </p>
                <div className= 'flex flex-row flex-wrap gap-2'>
                    <button onClick={removeFromWishlist}
                            className='btn btn-secondary w-28'>
                        Remove
                    </button>
                    <button onClick={addItemToCart}
                            className='btn btn-secondary w-28'>
                        Add to cart
                    </button>
                </div>
            </div>
        </article>
    )
}