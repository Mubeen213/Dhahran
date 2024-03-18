import {toast} from "react-toastify";
import {customFetch} from "../utils/index.jsx";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


export const OauthButton = () => {

    const [oauthParams, setOauthParams] = useState(null)
    const getOauthParams = async () => {
        try {
            const {data: {oauthAppDetails}} = await customFetch.get('/api/v1/auth/oauthDetails')
            setOauthParams(oauthAppDetails)
        } catch (e) {
            toast.error(e.response.data.msg)
        }
    }

    useEffect(() => {
        getOauthParams()
    }, [])

    const handleSSO = async () => {
        if (!oauthParams) {
            return
        }
        window.location.href = `${oauthParams.AUTHORIZATION_URL}?response_type=code` +
            `&client_id=${oauthParams.GOOGLE_CLIENT_ID}` +
            `&redirect_uri=${oauthParams.REDIRECT_URL}` +
            `&scope=${oauthParams.SCOPE}`
    }

    const handleGoogleCallback = async () => {
        try {
            const urlSearchParams = new URLSearchParams(window.location.search)
            const code = urlSearchParams.get('code')
            if (code) {
                const {data: {user}} = await customFetch.get(`/api/v1/auth/oauth/callback?code=${code}`)
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user))
                }
                window.location.href = '/';
            }
        } catch (e) {
            toast.error(e.response.data.msg)
            window.location.href = '/';
        }
    }

    useEffect(() => {
        handleGoogleCallback()
    }, [])

    return (
        <main className='grid place-items-center h-screen'>
            <section className='card w-96 shadow-md bg-base-200 p-8'>
                <h1 className='text-3xl text-center font-bold'>Dhahran</h1>
                <button className='btn btn-md btn-secondary mt-4' onClick={handleSSO}>
                    Continue with google
                </button>
                <Link to='/login' className='mt-5 text-center link link-hover link-primary'>
                    <p className='text-lg'>Back</p>
                </Link>
            </section>
        </main>
    )
}