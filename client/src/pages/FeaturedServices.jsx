import {customFetch} from "../utils/index.jsx";
import {useLoaderData} from "react-router-dom";
import axios from "axios";
import SingleService from "./SingleService.jsx";
import {ServiceList} from "./ServiceList.jsx";


export const loader = async () => {

    try {
        console.log("Calling the featured services")
        const {data} = await customFetch('/api/v1/services/featured');
        const {featured} = data
        return {featured};
    } catch (err) {
        console.log("Error occurred while fetching feature services", err)
    }
}

export const FeaturedServices = () => {

    const {featured} = useLoaderData();

    return (
        <section className='mt-12'>
            <h1 className= 'text-4xl sm:text-5xl md:text-6xl capitalize mb-4 font-bold tracking-tight'>
                Featured services
            </h1>
            <ServiceList services={featured}/>
        </section>
    )
}