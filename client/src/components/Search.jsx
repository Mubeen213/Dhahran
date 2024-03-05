import {Form, Link} from "react-router-dom";


export const Search = () => {

    return (
        <Form className='bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8
          sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            <input
                type='search'
                name='search'
                className= {`input input-bordered input-sm`}
                onChange={(e) => e.target.value}
            />
            <button type='submit' className='btn btn-primary btn-sm '>
                search
            </button>
            <Link to='/services' className='btn btn-accent btn-sm'>
                reset
            </Link>
        </Form>
    )

}