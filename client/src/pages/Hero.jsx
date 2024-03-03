import {Link} from "react-router-dom";
import image from "../assets/hero.jpeg";

export const Hero = () => {

    return (
        <section>
            <div className= 'grid grid-cols-1 lg:grid-cols-2 gap-2 items-center'>
                <div>
                    <h1 className= 'max-w-2xl text-4xl font-bold sm:text-6xl tracking-tight'>
                        Redefining the Way You Care for Your Wardrobe
                    </h1>
                    <p className= 'mt-8 max-w-xl text-lg leading-7'>
                        Experience the luxury of pristine freshness with our signature services. Elevate your wardrobe with our curated selection of featured services, meticulously designed to pamper your garments and simplify your life. Because your clothes deserve nothing but the best care, and so do you.
                    </p>
                    <div className= 'mt-10'>
                        <Link to='services' className= 'btn btn-primary'>
                            Our services
                        </Link>
                    </div>
                </div>
                <div className= 'hidden lg:carousel h-[28rem] flex justify-center'>
                    <img src={image} alt= 'Hero' className= 'rounded-box h-full object-cover'/>
                </div>
            </div>
        </section>
    )
}