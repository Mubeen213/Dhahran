import {configureStore} from "@reduxjs/toolkit";
import cartReducer from './features/cart/cartSlice.js'
import wishlistReducer from './features/wishlist/wishListSlice.js'

export const store = configureStore({
    reducer: {
        cartState: cartReducer,
        wishlistState: wishlistReducer
    }
})