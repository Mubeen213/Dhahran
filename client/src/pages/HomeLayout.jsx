import {Outlet} from "react-router-dom";
import {Header} from "../components/Header.jsx";
import {Navbar} from "../components/Navbar.jsx";

const HomeLayout = () => {

    return (
        <>
            <Header/>
            <Navbar/>
            <section className='align-element py-20'>
                <Outlet/>
            </section>
        </>
    )
}

export default HomeLayout;