import {SingleService} from "./index.js";
import image from "../assets/hero.jpeg";
import {retry} from "@reduxjs/toolkit/query";

import service1 from '../assets/service1.jpeg'
import service2 from '../assets/service2.jpeg'
import service3 from '../assets/service3.jpeg'
import service4 from '../assets/service4.jpeg'
import service5 from '../assets/service6.jpeg'
import service6 from '../assets/service6.jpeg'
import {Link} from "react-router-dom";

const featuredImages = [
    service1, service6, service2, service3, service4, service5
]

export const ServiceList = ({services}) => {
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {
                services.map((service, index) => {
                    const {name, description, price, featured, _id} = service
                    const image = featuredImages[index];
                    return (
                        <div className="flex flex-col max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <img className="rounded-t-lg" src={image} alt="" />
                            <div className="p-5 flex flex-col justify-between h-full">
                                <div>
                                    <h5 className="mb-2 mx-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {name}
                                    </h5>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        {description.substring(0, 60)} ...
                                    </p>
                                </div>
                                <Link to={`/services/${_id}`}
                                      className="btn btn-secondary
                                   inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg
                                    hover:bg-blue-800 focus:ring-4 focus:outline-none
                                    focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Read more
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                              stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    )
                })
            }
        </section>
    )

}