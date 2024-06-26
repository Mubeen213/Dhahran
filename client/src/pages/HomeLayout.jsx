import {Outlet, useNavigation} from "react-router-dom";
import {Header} from "../components/Header.jsx";
import {Navbar} from "../components/Navbar.jsx";
import {Loading} from "../components/Loading.jsx";

const HomeLayout = () => {
    const navigation = useNavigation();
    const isPageLoading = navigation.state === 'loading'
    return (
        <>
            <Header/>
            <Navbar/>
            {
                isPageLoading ? (<Loading/>) : (
                    <section className='align-element py-10'>
                        <Outlet/>
                    </section>
                )
            }
        </>
    )
}

export default HomeLayout;