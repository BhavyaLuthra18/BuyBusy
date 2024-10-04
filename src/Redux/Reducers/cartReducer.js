// productReducer.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { db } from "../../firebaseInit";
import { doc, updateDoc, getDoc, arrayUnion, arrayRemove } from "firebase/firestore";

// Get initial cart count from the database
export const getInitialCartCountThunk = createAsyncThunk(
  "cart/getInitialCartCount",
  async (_, thunkAPI) => {
    const { authReducer } = thunkAPI.getState();
    const { isLoggedIn, userLoggedIn } = authReducer;

    if (isLoggedIn) {
      try {
        const docRef = doc(db, "buybusy-redux", userLoggedIn.id);
        const initialSnapshot = await getDoc(docRef);

        if (initialSnapshot.exists()) {
          const data = initialSnapshot.data();
          const cart = data.cart || [];
          const totalItems = cart.reduce(
            (total, item) => total + (item.quantity || 0),
            0
          );
          return { totalItems, cart };
        } else {
          return { totalItems: 0, cart: [] };
        }
      } catch (error) {
        console.error("Error fetching cart count:", error);
        return { totalItems: 0, cart: [] };
      }
    }
    return { totalItems: 0, cart: [] };
  }
);

// Add product to cart and increase the count
export const addToCartAndIncreaseCountThunk = createAsyncThunk(
  "cart/addToCartAndIncreaseCount",
  async (product, thunkAPI) => {
    const { authReducer } = thunkAPI.getState();
    const { isLoggedIn, userLoggedIn } = authReducer;

    if (!isLoggedIn) {
      toast.error("Please first Login!!!");
      return;
    }

    try {
      const userRef = doc(db, "buybusy-redux", userLoggedIn.id);
      await updateDoc(userRef, {
        cart: arrayUnion({ quantity: 1, ...product }),
      });

      thunkAPI.dispatch(increaseCartCount(1));
      thunkAPI.dispatch(addToCart(product));
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart.");
    }
  }
);

// Remove product from cart and decrease the count
export const removeFromCartAndDecreaseCountThunk = createAsyncThunk(
  "cart/removeFromCartAndDecreaseCount",
  async (product, thunkAPI) => {
    const { authReducer } = thunkAPI.getState();
    const { userLoggedIn } = authReducer;

    try {
      const userRef = doc(db, "buybusy-redux", userLoggedIn.id);
      await updateDoc(userRef, {
        cart: arrayRemove(product),
      });

      thunkAPI.dispatch(decreaseCartCount(1));
      thunkAPI.dispatch(removeFromCart(product));
      toast.success("Remove from Cart !!");
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item from cart.");
    }
  }
);

// Slice for cart functionality
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    cartCount: 0,
  },
  reducers: {
    increaseCartCount: (state, action) => {
      state.cartCount += action.payload || 0;
    },
    decreaseCartCount: (state, action) => {
      state.cartCount = Math.max(0, state.cartCount - (action.payload || 0)); // Prevent negative count
    },
    setCartCount: (state, action) => {
      state.cartCount = action.payload || 0;
    },
    addToCart: (state, action) => {
      const itemToAdd = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === itemToAdd.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...itemToAdd, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const itemToRemove = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === itemToRemove.id
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== itemToRemove.id
          );
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialCartCountThunk.fulfilled, (state, action) => {
        state.cartCount = action.payload.totalItems;
        state.cartItems = action.payload.cart;
      });
  },
});

// Export the reducer and actions
export const { increaseCartCount, decreaseCartCount, setCartCount, addToCart, removeFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export const cartSelector = (state) => state.cart.cartItems;
