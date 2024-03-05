import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";


const defaultState = {
    cartItems: [],
    numItemsInCart: 0,
    cartTotal: 0,
    shipping: 500,
    tax: 0,
    orderTotal: 0
}

const cartSlice = createSlice({

    name: 'cart',
    initialState: defaultState,
    reducers: {
        addItem: (state, action) => {
            const {service} = action.payload

            const isItemPresent = state.cartItems.find((item) => item.cartID === service.cartID)

        },
        removeItem: (state, action) => {
            const {cartID} = action.payload;
            const service = state.cartItems.find((item) => item.cartID === cartID)
            state.cartItems = state.cartItems.filter((item) => item.cartID !== cartID)

            state.numItemsInCart -= 1;
        },
        editItem: (state, action) => {

        },
        clearCart: (state, action) => {
            localStorage.setItem('cart', JSON.stringify(defaultState))
        },

        calculateTotals: (state) => {
            state.tax = 0.1 * state.cartTotal;
            state.orderTotal = state.orderTotal + state.shipping + state.tax;
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