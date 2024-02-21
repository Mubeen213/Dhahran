import {Link, useRouteError} from "react-router-dom";


const Error = () => {

    const error = useRouteError()
    console.log(error)

    if (error.status === 404) {
        return (
            <main className='grid min-h-[100vh] place-items-center px-8'>
                <div className='text-center'>
                    <p className='text-8xl font-bold'>404</p>
                    <h1 className='mt-4 text-5xl capitalize'>Page not found</h1>
                    <p className='mt-6 text-3xl tracking-tight'>Sorry, we couldn't find the page you're looking for.</p>
                    <div className='mt-5'>
                        <Link to='/' className='btn btn-secondary'>Go back home</Link>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className= 'grid min-h[100vh] place-items-center'>
            <h4 className= 'text-5xl text-center'>There was an error</h4>
        </main>
    )
}

export default Error;