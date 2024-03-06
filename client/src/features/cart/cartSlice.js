import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";


const defaultState = {
    cartItems: [],
    numItemsInCart: 0,
    cartTotal: 0,
    shippingFee: 500,
    tax: 0,
    orderTotal: 0
}

const getCartFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('cart')) || defaultState;
};

const cartSlice = createSlice({

    name: 'cart',
    initialState: getCartFromLocalStorage,
    reducers: {
        addItem: (state, action) => {
            const {service} = action.payload

            const item = state.cartItems.find((item) => item.cartID === service.cartID)

            if (item) {
                item.amount += service.amount;
            } else {
                state.cartItems.push(service)
            }
            state.numItemsInCart += service.amount;
            state.cartTotal += service.price * service.amount;
            cartSlice.caseReducers.calculateTotals(state)
            toast.success('Item added to cart')
        },

        removeItem: (state, action) => {
            const {cartID} = action.payload;
            const service = state.cartItems.find((item) => item.cartID === cartID)
            state.cartItems = state.cartItems.filter((item) => item.cartID !== cartID)
            state.numItemsInCart -= service.amount;
            state.cartTotal -= service.price * service.amount;
            cartSlice.caseReducers.calculateTotals(state)
            toast.error('Item removed from cart')
        },
        editItem: (state, action) => {
            const { cartID, amount } = action.payload;
            const item = state.cartItems.find((i) => i.cartID === cartID);
            state.numItemsInCart += amount - item.amount;
            state.cartTotal += item.price * (amount - item.amount);
            item.amount = amount;
            cartSlice.caseReducers.calculateTotals(state);
            toast.success('Cart updated');
        },
        clearCart: (state, action) => {
            localStorage.setItem('cart', JSON.stringify(defaultState))
        },

        calculateTotals: (state) => {
            state.tax = 0.1 * state.cartTotal;
            state.orderTotal = state.cartTotal + state.shippingFee + state.tax;
            localStorage.setItem('cart', JSON.stringify(state))
        }
    }
})

export const {
    addItem
    , removeItem
    , editItem
    , clearCart
} = cartSlice.actions

export default cartSlice.reducer;