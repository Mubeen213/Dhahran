import {useLoaderData} from "react-router-dom";
import {customFetch} from "../utils/index.js";
import {ServiceList} from "./ServiceList.jsx";

export const serviceLoader = async ({request}) => {

    const {data} = await customFetch('/api/v1/services')
    const {services} = data
    return {services}
}

const Services = () => {
    const {services} = useLoaderData()
    return(
        <ServiceList services={services}/>
    )
}

export default Services;