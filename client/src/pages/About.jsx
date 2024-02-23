import {AboutParas} from "../components/AboutParas.jsx";

const About = () => {
    return (
        <section className="flex justify-center
         max-w-5xl mx-auto flex-wrap items-center leading-8 p-8">
            <div className='w-100'>
                <h1 className='text-5xl text-center'>About Us</h1>
               <AboutParas/>
            </div>
        </section>
    );
}

export default About;