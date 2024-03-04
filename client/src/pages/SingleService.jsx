import service1 from '../assets/service1.jpeg'
import {customFetch} from "../utils/index.js";
import {Link, useLoaderData} from "react-router-dom";


export const singleServiceLoader = async ({params}) => {
    console.log("Params " + params.id + " " + params)
    const {data} = await customFetch(`/api/v1/services/${params.id}`)
    return {service: data.service}
}

const SingleService = () => {

    const {service} = useLoaderData()
    const {name, description, price} = service

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
                    src={service1}
                    alt='Serice image'
                    className= 'w-96 h-96 object-cover rounded-lg lg:w-full'/>
                <div className=''>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl tracking-tight font-medium'>{name}</h1>
                    <p className='mt-6 text-xl'>{description}</p>
                    <p className= 'mt-3 text-xl'>
                        ${price}</p>

                    <div className= 'mt-5'>
                        <button  onClick={() => console.log("Adding to cart")}
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