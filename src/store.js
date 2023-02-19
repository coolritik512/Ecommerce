import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './features/cart-slice'
import productsReducer from './features/products-slice'
import catergoriesReducer from './features/categories-slice'
import checkoutReducer from './features/checkout-slice'


export const store=configureStore({
    reducer:{
        cart : cartReducer,
        products : productsReducer,
        categories : catergoriesReducer,
        checkout : checkoutReducer
    }
})