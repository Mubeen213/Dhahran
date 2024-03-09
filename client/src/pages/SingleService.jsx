import {customFetch, formatPrice, generateAmountOptions} from "../utils/index.jsx";
import {Link, useLoaderData} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addItem} from "../features/cart/cartSlice.js";
import {useState} from "react";
import {addItemToWishList} from "../features/wishlist/wishListSlice.js";


export const singleServiceLoader = async ({params}) => {
    const serviceResponse = await customFetch(`/api/v1/services/${params.id}`)
    const service = serviceResponse.data.service

    const serviceItemsResponse = await customFetch(`/api/v1/serviceItems/${params.id}`)
    const serviceItems = serviceItemsResponse.data.service
    return {service, serviceItems}
}

const SingleService = () => {

    const {service} = useLoaderData()
    const {name, description, price, _id, image} = service
    const [amount, setAmount] = useState(1);

    console.log("Image url " + image)
    const handleAmount = (e) => {
        setAmount(parseInt(e.target.value));
    };

    const dispatch = useDispatch();
    const cartService = {
        cartID: _id,
        name,
        price,
        amount
    }

    const wishLIstService = {
        wishListID: _id,
        name,
        price
    }

    const addToCart = () => {
        dispatch(addItem({service: cartService}))
    }

    const addToWishList = () => {
        dispatch(addItemToWishList({service: wishLIstService}))
    }

    return (
        <section>
            <div className='text-md breadcrumbs'>
                <ul>
                    <li>
                        <Link to='/'>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to='/services'>
                            Services
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='mt-6 grid lg:grid-cols-2 gap-y-8 lg:gap-x-16'>
                <img
                    src={`http://localhost:5001${image}`}
                    alt='Serice image'
                    className= 'w-96 h-96 object-cover rounded-lg lg:w-full'/>
                <div className=''>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl tracking-tight font-medium'>{name}</h1>
                    <p className='mt-6 text-xl'>{description}</p>
                    {/*<p className='mt-3 text-xl'>*/}
                    {/*    {formatPrice(price)}</p>*/}
                    {/*<div className='form-control w-full max-w-xs'>*/}
                    {/*    <label className='label' htmlFor='amount'>*/}
                    {/*        <h4 className='text-md font-medium -tracking-wider capitalize'>*/}
                    {/*            amount*/}
                    {/*        </h4>*/}
                    {/*    </label>*/}
                    {/*    <select*/}
                    {/*        className='select select-secondary select-bordered select-md'*/}
                    {/*        id='amount'*/}
                    {/*        value={amount}*/}
                    {/*        onChange={handleAmount}*/}
                    {/*    >*/}
                    {/*        {generateAmountOptions(20)}*/}
                    {/*    </select>*/}
                    {/*</div>*/}
                    {/*<div className='mt-5 flex flex-wrap gap-x-4'>*/}
                    {/*    <button onClick={addToCart}*/}
                    {/*            className='btn btn-secondary btn-md'>*/}
                    {/*        Add to cart*/}
                    {/*    </button>*/}
                    {/*    <button onClick={addToWishList}*/}
                    {/*            className='btn btn-secondary btn-md'>*/}
                    {/*        Add to wishlist*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div>
        </section>
    )
}

export default SingleService;