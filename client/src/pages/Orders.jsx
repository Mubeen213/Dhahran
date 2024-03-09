import {toast} from "react-toastify";
import {redirect, useLoaderData} from "react-router-dom";
import {customFetch} from "../utils/index.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import {OrderList} from "../components/OrderList.jsx";

export const orderLoader = async ({request}) => {

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        toast.warn('Please login to view orders')
        return redirect('/login')
    }

    try {
        const {data} = await customFetch.get('/api/v1/orders/userOrders')
        const {orders} = data
        return {orders};
    } catch (error) {
        const errorMessage =
            error?.response?.data?.msg ||
            'There was an error placing your order';
        toast.error(errorMessage);
        return null
    }
}

const Orders = () => {
    const {orders} = useLoaderData();

    if (!orders || orders.length < 1) {
        return <SectionTitle text='Empty! Please continue shopping'/>
    }

    return (
        <>
            <SectionTitle text='Your orders'/>
                <div className='mt-8'>
                    {
                        orders.map((order) => {
                            return <OrderList key={order._id} order={order}/>
                        })
                    }
                </div>
        </>
    )
}


export default Orders