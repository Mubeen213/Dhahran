import {Link, useNavigate} from "react-router-dom";
import {customFetch} from "../utils/index.jsx";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {clearCart} from "../features/cart/cartSlice.js";


export const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('user'));
    const handleLogout = async () => {
        try {
            const {data} = await customFetch('/api/v1/auth/logout')
            dispatch(clearCart())
            localStorage.removeItem('user')
            toast.success('Logged out successfully');
            navigate('/')
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    return (
        <header className=' bg-neutral py-2 text-neutral-content '>
            <div className='align-element flex justify-center sm:justify-end '>
                {user ? (
                    <div className='flex gap-x-2 sm:gap-x-8 items-center'>
                        <p className='text-xs sm:text-sm'>Hello, {user.name}</p>
                        <button
                            className='btn btn-xs btn-outline btn-primary '
                            onClick={handleLogout}
                        >
                            logout
                        </button>
                    </div>
                ) : (
                    <div className='flex gap-x-6 justify-center items-center'>
                        <Link to='/login' className='link link-hover text-xs sm:text-sm'>
                            Sign in
                        </Link>
                        <Link to='/register' className='link link-hover text-xs sm:text-sm'>
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </header>
    )
}