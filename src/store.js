// for creating store
import { configureStore } from "@reduxjs/toolkit";

// Auth Reducer
import { authReducer } from "./Redux/Reducers/authReducer";

//product reducer
import { productReducer } from "./Redux/Reducers/productReducer";

// cart reducer
import { cartReducer } from "./Redux/Reducers/cartReducer";

// creating store from reducers
export const store = configureStore({
  reducer: {
    authReducer,
    productReducer,
    cart: cartReducer,
  },
});
