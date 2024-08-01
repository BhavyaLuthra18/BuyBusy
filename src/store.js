// for creating store
import { configureStore } from "@reduxjs/toolkit";

// Auth Reducer 
import { authReducer } from "./Redux/Reducers/authReducer";

//product reducer 
import { productReducer } from "./Redux/Reducers/productReducer";

// creating store from reducers
export const store = configureStore({
    reducer:{
        authReducer,
        productReducer
    }
    
})

