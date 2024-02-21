import {Form} from "react-router-dom";
import {FormInput} from "../components/FormInput.jsx";
import {SubmitBtn} from "../components/SubmitBtn.jsx";


const Login = () => {

    return (
        <section className='grid h-screen place-items-center'>
            <Form method='POST' className='card w-96 shadow p-8 bg-base-100'>
                <h4 className='text-3xl text-center font-bold'>Login</h4>
                <FormInput
                    name='email'
                    type='email'
                    label='email'
                    defaultValue=''
                />
                <FormInput
                    name='password'
                    type='password'
                    label='password'
                    defaultValue=''
                />
                <div className='mt-6'>
                    <SubmitBtn text= 'Login'/>
                </div>
            </Form>
        </section>
    )
}

export default Login;