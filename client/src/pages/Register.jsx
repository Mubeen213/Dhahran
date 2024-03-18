import {Form, Link, redirect} from "react-router-dom";
import {FormInput} from "../components/FormInput.jsx";
import {SubmitBtn} from "../components/SubmitBtn.jsx";
import {customFetch} from "../utils/index.jsx";
import {toast} from "react-toastify";

export const registerAction = async ({request}) => {
    try {
        const formData = await request.formData();
        const inputs = Object.fromEntries(formData);
        const {data: {user}} = await customFetch.post('/api/v1/auth/register', inputs)
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
        <section className='grid h-full sm:h-screen place-items-center py-10 bg-secondary'>
            <Form method='POST'
                  className='card p-8 shadow bg-base-200 w-96 sm:w-2/4'>
                <h1 className='text-center block text-3xl font-bold'>Register</h1>
                <div className='mt-6 grid sm:grid-cols-1 md:grid-cols-2
                    gap-4'>
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
                    <FormInput
                        type='number'
                        label='Phone number'
                        name='phoneNumber'
                    />
                    <FormInput
                        type='date'
                        label='Date of birth'
                        name='dateOfBirth'
                    />
                    <FormInput
                        type='text'
                        label='Credit card'
                        name='creditCard'
                    />
                </div>
                <div className='mt-8 flex flex-col items-center justify-center'>
                    <SubmitBtn text='Register'/>
                    <Link to='/sso' className=' text-center link link-primary link-hover mt-3'>
                        <p>Signup another way </p>
                    </Link>
                    <p className='text-center mt-4'>
                        Already a member?
                        <Link
                            to='/login'
                            className='ml-2 link link-hover link-primary capitalize'
                        >
                            login
                        </Link>
                    </p>
                </div>
            </Form>
        </section>
    )
}

export default Register;