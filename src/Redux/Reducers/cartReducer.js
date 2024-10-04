import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { db } from "../../firebaseInit";
import {
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

// Async thunk to get initial cart count from the database
export const getInitialCartCountThunk = createAsyncThunk(
  "cart/getInitialCartCount",
  async (args, thunkAPI) => {
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
          console.error("Document not found.");
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

// Async thunk to add a product to the cart and increase the count
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

// Async thunk to remove a product from the cart and decrease the count
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
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item from cart.");
    }
  }
);

// Cart Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    cartCount: 0,
  },
  reducers: {
    increaseCartCount: (state, action) => {
      const countToAdd = action.payload || 0;
      console.log("Increasing cart count by:", countToAdd);
      state.cartCount += countToAdd;
    },
    decreaseCartCount: (state, action) => {
      const countToSubtract = action.payload || 0;
      state.cartCount = Math.max(0, state.cartCount - countToSubtract); // Prevent negative cart count
    },
    setCartCount: (state, action) => {
      state.cartCount = action.payload || 0;
    },
    addToCart: (state, action) => {
      const itemToAdd = action.payload;
      if (!itemToAdd || !itemToAdd.id) return; // Prevent adding empty or invalid items
      const existingItem = state.cartItems.find(
        (item) => item.id === itemToAdd.id
      );
      if (existingItem) {
        // Increment quantity if the item exists
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
        state.cartCount = action.payload.totalItems; // Set initial cart count
        state.cartItems = action.payload.cart; // Initialize cart items
      })
      .addCase(addToCartAndIncreaseCountThunk.fulfilled, (state, action) => {})
      .addCase(
        removeFromCartAndDecreaseCountThunk.fulfilled,
        (state, action) => {}
      );
  },
});

// Export the reducer
export const cartReducer = cartSlice.reducer;

// Export the actions
export const {
  increaseCartCount,
  decreaseCartCount,
  setCartCount,
  addToCart,
  removeFromCart,
} = cartSlice.actions;

// Selector to get cart items
export const cartSelector = (state) => state.cart.cartItems;
