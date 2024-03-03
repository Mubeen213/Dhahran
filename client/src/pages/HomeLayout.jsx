import {Outlet, useNavigation} from "react-router-dom";
import {Header} from "../components/Header.jsx";
import {Navbar} from "../components/Navbar.jsx";
import {Loading} from "../components/Loading.jsx";

const HomeLayout = () => {
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading'
    return (
        <>
            <Header/>
            <Navbar/>
            {
                isLoading ? (<Loading/>) : (
                    <section className='align-element py-20'>
                        <Outlet/>
                    </section>
                )
            }
        </>
    )
}

export default HomeLayout;