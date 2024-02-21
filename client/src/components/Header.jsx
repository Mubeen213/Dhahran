import {Link} from "react-router-dom";


export const Header = () => {
    return (
        <header className='bg-neutral py-3 text-neutral-content'>
            <div className='flex justify-center align-element sm:justify-end'>
                <div className= 'flex gap-x-6'>
                    <Link to='/login' className='link link-hover'>
                        Login
                    </Link>
                    <Link to='/register' className='link link-hover'>
                        Register
                    </Link>
                </div>
            </div>
        </header>
    )
}