import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";


const defaultState = {
    wishListItems: [],
    numItemsInWishList: 0
}

const getWishListFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('wishlist')) || defaultState;
}

const wishListSlice = createSlice({

    name: 'wishlist',
    initialState: getWishListFromLocalStorage,
    reducers: {
        addItemToWishList: (state, action) => {
            console.log(action.payload)
            const {service} = action.payload
            console.log("Wishlist items are  " + state.wishListItems)
            const item = state.wishListItems.find((it) => it.wishListID === service.wishListID)
            if(!item) {
                console.log("Adding service to wishListItems")
                state.wishListItems.push(service)
            }
            state.numItemsInWishList = state.wishListItems.length
            localStorage.setItem('wishlist', JSON.stringify(state))
            toast.success('Service added to wishlist')
        },
        removeItemFromWishList: (state, action) => {
            const {wishListID} = action.payload
            state.wishListItems.filter((item) => item.wishListID !== wishListID)
            state.numItemsInWishList = state.wishListItems.length
        }
    }
})

export const {
    addItemToWishList,
    removeItemFromWishList
} = wishListSlice.actions

export default wishListSlice.reducer