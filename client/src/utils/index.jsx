import axios from "axios";
import service1 from '../assets/service1.jpeg'
import service2 from '../assets/service2.jpeg'
import service3 from '../assets/service3.jpeg'
import service4 from '../assets/service4.jpeg'
import service5 from '../assets/service6.jpeg'


const baseUrl = "http://localhost:5100/api/v1";

export const customFetch = axios.create({
    // baseURL: baseUrl
})

export const formatPrice = (price) => {
    const dollarsAmount = new Intl.NumberFormat('ar-SA', {
        style: 'currency',
        currency: 'SAR',
    }).format((price / 100).toFixed(2));
    return dollarsAmount;
};

export const generateAmountOptions = (number) => {
    return Array.from({ length: number }, (_, index) => {
        const amount = index + 1;
        return (
            <option key={amount} value={amount}>
                {amount}
            </option>
        );
    });
};

// Creating a map to store images against a service ID
// This is a hack to avoid deploying images separately
const imagesMap = new Map();
imagesMap.set('65e4645462255f61df5548c9', service1)
imagesMap.set('65e4648a62255f61df5548cb', service2)
imagesMap.set('65e464ea62255f61df5548cd', service3)
imagesMap.set('65e4653f62255f61df5548cf', service4)
imagesMap.set('65e4657762255f61df5548d1', service5)

export default imagesMap
