import {Form, Link, redirect} from "react-router-dom";
import {FormInput} from "../components/FormInput.jsx";
import {SubmitBtn} from "../components/SubmitBtn.jsx";
import {toast} from "react-toastify";
import {customFetch} from "../utils/index.jsx";


export const loginAction = async ({request}) => {

    try {
        const formData = await request.formData();
        const inputs = Object.fromEntries(formData)
        const {data : {user}} = await customFetch.post('/api/v1/auth/login', inputs)
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Logged in successfully')
        return redirect('/')
    } catch (err) {
        console.log(err)
        let msg = err.response.data.msg
        toast.error(msg)
        return null;
    }
}

const Login = () => {

    return (
        <section className='grid h-screen place-items-center bg-secondary'>
            <Form
                method='POST'
                className='card w-96 shadow p-8 bg-base-100'>
                <h4 className='text-3xl text-center font-bold'>Login</h4>
                <FormInput
                    name='email'
                    type='email'
                    label='email'
                />
                <FormInput
                    name='password'
                    type='password'
                    label='password'
                />
                <div className='mt-6'>
                    <SubmitBtn text='Login'/>
                </div>
                <p className='text-center mt-4'>
                    Not a member yet?{' '}
                    <Link
                        to='/register'
                        className='ml-2 link link-hover link-primary capitalize'
                    >
                        register
                    </Link>
                </p>
            </Form>
        </section>
    )
}

export default Login;