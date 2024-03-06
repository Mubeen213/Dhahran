import service1 from '../assets/service1.jpeg'
import imagesMap, {customFetch, formatPrice, generateAmountOptions} from "../utils/index.jsx";
import {Link, useLoaderData} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addItem} from "../features/cart/cartSlice.js";
import {useState} from "react";


export const singleServiceLoader = async ({params}) => {
    const {data} = await customFetch(`/api/v1/services/${params.id}`)
    return {service: data.service}
}

const SingleService = () => {

    const {service} = useLoaderData()
    const {name, description, price, _id} = service
    const [amount, setAmount] = useState(1);

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

    const addToCart = () => {
        dispatch(addItem({service: cartService}))
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
                    src={imagesMap.get(_id)}
                    alt='Serice image'
                    className= 'w-96 h-96 object-cover rounded-lg lg:w-full'/>
                <div className=''>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl tracking-tight font-medium'>{name}</h1>
                    <p className='mt-6 text-xl'>{description}</p>
                    <p className= 'mt-3 text-xl'>
                        {formatPrice(price)}</p>
                    <div className='form-control w-full max-w-xs'>
                        <label className='label' htmlFor='amount'>
                            <h4 className='text-md font-medium -tracking-wider capitalize'>
                                amount
                            </h4>
                        </label>
                        <select
                            className='select select-secondary select-bordered select-md'
                            id='amount'
                            value={amount}
                            onChange={handleAmount}
                        >
                            {generateAmountOptions(20)}
                        </select>
                    </div>
                    <div className= 'mt-5'>
                        <button  onClick={addToCart}
                            className= 'btn btn-secondary btn-md'>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SingleService;