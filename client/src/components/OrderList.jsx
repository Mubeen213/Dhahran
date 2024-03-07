import {Link, useLoaderData} from "react-router-dom";
import imagesMap, {formatPrice} from "../utils/index.jsx";


export const OrderList = ({order}) => {

    const {orderItems, status, tax, subTotal, total, createdAt} = order
    console.log(orderItems)
    return (
        <article className='grid gap-4
         lg:grid-cols-12 bg-base-200 rounded-lg shadow-md mb-12'>
            <div className='lg:col-span-6 mt-8 pl-4'>
                {orderItems.map((item) => (
                    <Link to={`/services/${item.service}`}>
                        <div key={item._id}
                             className='mb-12 flex flex-row '
                        >
                            <img
                                src={imagesMap.get(item.service)}
                                alt='service-img'
                                className='h-32 w-32 rounded-lg sm:h-40 sm:w-40 object-cover
                            mr-8'
                            />
                            <div className='flex flex-col '>
                                <h3 className='mb-1 text-xl'>
                                    <span className='font-medium'> Name: </span>
                                    {item.name}
                                </h3>
                                <p className='mb-1 text-xl '>
                                    <span className='font-medium'>  Quantity: </span>
                                    {item.amount}
                                </p>
                                <p className='mb-1 text-xl'>
                                    <span className='font-medium'>  Price: </span>
                                    {formatPrice(item.price)}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className='lg:col-span-6 mt-8 p-4'>
                <h2 className='text-xl  sm:text-2xl mb-4 font-medium'>Order Summary</h2>
                <p className='text-xl capitalize'><span className='font-medium'> Status: </span> {status}</p>
                <p className='text-xl sm:text-base'><span
                    className='font-medium'> Subtotal: </span> {formatPrice(subTotal)}</p>
                <p className='text-xl sm:text-base'><span className='font-medium'> Tax: </span> {formatPrice(tax)}</p>
                <p className='text-xl sm:text-base'><span className='font-medium'> Total: </span> {formatPrice(total)}
                </p>
                <p className='text-xl sm:text-base'><span
                    className='font-medium'> Order Date: </span> {new Date(createdAt).toLocaleString()}</p>
            </div>
        </article>
    );
}