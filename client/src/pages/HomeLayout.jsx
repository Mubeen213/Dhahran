import {Outlet} from "react-router-dom";
import {Header} from "../components/Header.jsx";

const HomeLayout = () => {

    return (
        <h1>
            <Header/>
            <Outlet/>
        </h1>
    )
}

export default HomeLayout;