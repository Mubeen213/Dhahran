import {redirect, useLoaderData, useNavigate} from "react-router-dom";
import {customFetch} from "../utils/index.jsx";
import {toast} from "react-toastify";
import {useEffect} from "react";


export const verifyEmailLoader = async ({request}) => {

    try {
        const params = Object.fromEntries([
            ...new URL(request.url).searchParams.entries(),
        ]);
        const response = await customFetch.post('/api/v1/auth/verify-email', params)
        toast.success('Email verified successfully, Please login to continue')
       return redirect('/login')
    } catch (error) {
        toast.error(error.response.data.msg)
    }
    return redirect('/')
};

const VerifyEmail = () => {

     useLoaderData()

    return (
        <main className= 'h-screen align-element grid items-center'>
            Verifying you email...
        </main>
    )
}
export default VerifyEmail