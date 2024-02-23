import {Outlet} from "react-router-dom";
import {Header} from "../components/Header.jsx";
import {Navbar} from "../components/Navbar.jsx";

const HomeLayout = () => {

    return (
        <>
            <Header/>
            <Navbar/>
            <Outlet/>
        </>
    )
}

export default HomeLayout;