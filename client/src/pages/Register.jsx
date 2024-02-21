import {Form} from "react-router-dom";
import {FormInput} from "../components/FormInput.jsx";
import {SubmitBtn} from "../components/SubmitBtn.jsx";


const Register = () => {
    return (
        <section className='h-screen grid place-items-center'>
            <Form className='card bg-base-100  w-96 p-8 shadow'>
                <h1 className='text-center text-3xl font-bold'>Register</h1>
                <FormInput
                    type='text'
                    label='name'
                    name='name'
                    defaultValue=''
                />
                <FormInput
                    type='email'
                    label='email'
                    name='email'
                    defaultValue=''
                />
                <FormInput
                    type='password'
                    label='password'
                    name='password'
                    defaultValue=''
                />
                <div className='mt-8'>
                    <SubmitBtn text='Register'/>
                </div>
            </Form>
        </section>
    )
}

export default Register;