import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productStore/productSlice'

export const store = configureStore({
    reducer: {
        products: productReducer,
    },
})