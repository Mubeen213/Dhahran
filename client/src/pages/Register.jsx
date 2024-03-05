import {Form, Link, redirect} from "react-router-dom";
import {FormInput} from "../components/FormInput.jsx";
import {SubmitBtn} from "../components/SubmitBtn.jsx";
import {customFetch} from "../utils/index.jsx";
import {toast} from "react-toastify";

export const registerAction = async ({request}) => {
    try {
        const formData = await request.formData();
        const inputs = Object.fromEntries(formData);
        const {data: {user} } = await customFetch.post('/api/v1/auth/register', inputs)
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Account created')
        return redirect('/')
    } catch (err) {
        let msg = err.response.data.msg
        toast.error(msg)
        return null
    }
}

const Register = () => {
    return (
        <section className='h-screen grid place-items-center'>
            <Form method='POST'
                  className='card bg-base-100  w-96 p-8 shadow'>
                <h1 className='text-center text-3xl font-bold'>Register</h1>
                <FormInput
                    type='text'
                    label='name'
                    name='name'
                />
                <FormInput
                    type='email'
                    label='email'
                    name='email'
                />
                <FormInput
                    type='password'
                    label='password'
                    name='password'
                />
                <div className='mt-8'>
                    <SubmitBtn text='Register'/>
                </div>
                <p className='text-center mt-4'>
                    Already a member?
                    <Link
                        to='/login'
                        className='ml-2 link link-hover link-primary capitalize'
                    >
                        login
                    </Link>
                </p>
            </Form>
        </section>
    )
}

export default Register;