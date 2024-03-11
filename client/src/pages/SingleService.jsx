import {customFetch} from "../utils/index.jsx";
import {Link, useLoaderData} from "react-router-dom";
import {SingleServiceItem} from "../components/SingleServiceitem.jsx";

export const singleServiceLoader = async ({params}) => {
    const serviceResponse = await customFetch(`/api/v1/services/${params.id}`)
    const service = serviceResponse.data.service

    const serviceItemsResponse = await customFetch(`/api/v1/serviceItems/${params.id}`)
    const serviceItems = serviceItemsResponse.data.serviceItems
    return {service, serviceItems}
}

const SingleService = () => {

    const {service, serviceItems} = useLoaderData()
    const {name, description, image} = service


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
                    src={image}
                    alt='Serice image'
                    className='w-96 h-96 object-cover rounded-lg lg:w-full'/>
                <div className=''>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl tracking-tight font-medium'>{name}</h1>
                    <p className='mt-6 text-xl'>{description}</p>
                </div>
            </div>
            <div className='mt-6 grid lg:grid-cols-2 gap-y-8 lg:gap-x-16'>
                {
                    serviceItems.map((serviceItem) => {
                        return <SingleServiceItem key={serviceItem._id} serviceItem={serviceItem}/>
                    })
                }
            </div>
        </section>
    )
}

export default SingleService;