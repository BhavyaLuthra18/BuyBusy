// for creating slice and AsycnThunk
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//firebase database
import { db } from "../../firebaseInit";
import {
  getDoc,
  updateDoc,
  doc,
  arrayUnion,
  onSnapshot,
  arrayRemove,
} from "firebase/firestore";

// for toast notification
import { toast } from "react-toastify";

//return  date in yy/mm/dd format

function getDateTime() {
  // Getting current date and time
  const date = new Date();

  // Extracting date components
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Extracting time components
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Formatting data and time
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  // Returning date and time
  return `${formattedDate} ${formattedTime}`;
}

export const getInitialCartOrdersThunk = createAsyncThunk(
  "product/getCartOrders",
  async (args, thunkAPI) => {
    const { authReducer} = thunkAPI.getState();
    const { isLoggedIn, userLoggedIn } = authReducer;

    if (isLoggedIn) {
      try {
        const docRef = doc(db, "buybusy-redux", userLoggedIn.id);

        // Get the initial snapshot of the document
        const initialSnapshot = await getDoc(docRef);

        if (initialSnapshot.exists()) {
          const data = initialSnapshot.data();

          // Dispatch actions to set cart and orders in the state
          thunkAPI.dispatch(setCart(data.cart || []));
          thunkAPI.dispatch(setMyOrders(data.orders || []));

          // Listen for real-time updates
          const unsubscribe = onSnapshot(docRef, (doc) => {
            const updatedData = doc.data();
            thunkAPI.dispatch(setCart(updatedData.cart || []));
            thunkAPI.dispatch(setMyOrders(updatedData.orders || []));
          });

          // Return the initial cart data for the fulfilled action payload
          return data.cart || [];
        } else {
          console.error("Document not found.");
          return [];
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    }

    // If not logged in, return an empty array
    return [];
  }
);


// async thunk to update cart to the database
const updateCartInDatabase = createAsyncThunk(
  "product/updateCartInDatabase",
  async (args, thunkAPI) => {
    // user's data from intialState
    const { authReducer, productReducer } = thunkAPI.getState();
    const { userLoggedIn } = authReducer;

    // update the cart inside the firebase
    const userRef = doc(db, "buybusy-redux", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: productReducer.cart,
    });
  }
);

// Async thunk to increase the quantity of product in the cart and databasr
export const increaseQuantThunk = createAsyncThunk(
  //action type to increase product quantity
  "product/increaseProductQuantity",
  //thunk action creator
  async (product, thunkAPI) => {
    // get product data from the redux store
    const { productReducer } = thunkAPI.getState();
    //  Find the index of the product in the cart
    const index = productReducer.cart.findIndex(
      (item) => item.name === product.name
    );

    // Dispatch actions to  increase quantity and update the cart in  the database
    thunkAPI.dispatch(increaseProductQuantity(index));
    thunkAPI.dispatch(increaseTotalAmount(product.price));
    thunkAPI.dispatch(updateCartInDatabase());
  }
);

// Async thunk to decrease the quantity of a product in the cart and database
export const decreaseQuantThunk = createAsyncThunk(
  //action type
  "product/decreaseProductQuantity",
  // thunk action creator
  async (product, thunkAPI) => {
    // Get  product data from the Redux Store
    const { productReducer } = thunkAPI.getState();
    // Find the index pf the product in the cart
    const index = productReducer.cart.findIndex(
      (item) => item.name === product.name
    );

    // If the quantity of the product is 1 , remove it from the cart
    if (productReducer.cart[index].quantity === 1) {
      thunkAPI.dispatch(removeFromCartThunk(product));
      return;
    }

    // Otherwise ,decrease the quantity ,update the total amount , and  update the cart
    thunkAPI.dispatch(decreaseProductQuantity(index));
    thunkAPI.dispatch(reduceTotalAmount(productReducer.cart[index].price));
    thunkAPI.dispatch(updateCartInDatabase());
  }
);

// async thunk for adding a new product to the cart
export const addToCartThunk = createAsyncThunk(
  "product/addToCart",
  async (product, thunkAPI) => {
    // getting user's data
    const { authReducer, productReducer } = thunkAPI.getState();
    const { isLoggedIn, userLoggedIn } = authReducer;

    // check whether user is logged in or not
    if (!isLoggedIn) {
      toast.error("Please first Login!!!");
      return;
    }

    // checking whether the product already in the cart
    const index = productReducer.cart.findIndex(
      (item) => item.name === product.name
    );
    if (index !== -1) {
      //if product already in the cart then increase quantity and return
      thunkAPI.dispatch(increaseQuantThunk(productReducer.cart[index]));
      toast.success("Product Quantity Increased !!");
      return;
    }

    // else add product to the cart in the database
    const userRef = doc(db, "buybusy-redux", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: arrayUnion({ quantity: 1, ...product }),
    });

    // increase total amount and product quantity
    thunkAPI.dispatch(increaseTotalAmount(product.price));
    thunkAPI.dispatch(increaseTotalItem());

    // toast notification
    toast.success("Added to your Cart !!");
  }
);

//Async  thunk to removena product from the cart
export const removeFromCartThunk = createAsyncThunk(
  // action type for removing cart
  "product/removeFromCart",
  async (product, thunkAPI) => {
    // Get  user data from the redux store
    const { authReducer } = thunkAPI.getState();
    const { userLoggedIn } = authReducer;

    // Remove the product from the cart in the database
    const userRef = doc(db, "buybusy-redux", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: arrayRemove(product),
    });

    // return the product to the extaReducer for  further operations
    return product;
  }
);

//Async thunk of remove all products from the best

export const clearCartThunk = createAsyncThunk(
  "product/emptyCart",
  // action type for clearCart
  async (args, thunkAPI) => {
    // Get user and product data from the redux store
    const { authReducer, productReducer } = thunkAPI.getState();
    const { userLoggedIn } = authReducer;

    // if no items in the cart , return with an error message
    if (productReducer.itemInCart === 0) {
      toast.error("Nothing to remove in  Cart !!");
      return;
    }

    // Empty the cart array in the database
    const userRef = doc(db, "buybusy-redux", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: [],
    });

    // Show a success notification
    toast.success("Empty Cart !!");
  }
);

// Orders
// async thunk to purchase all the product in the cart
export const purchaseAllThunk = createAsyncThunk(
  // action type for purchase all items
  "product/purchaseAllItems",
  async (args, thunkAPI) => {
    //getting user's data
    const { authReducer, productReducer } = thunkAPI.getState();
    const { userLoggedIn } = authReducer;

    // get current date from function
    const currentData = getDateTime();

    // getting  order from the database with data, product and amount
    const userRef = doc(db, "buybusy-redux", userLoggedIn.id);
    await updateDoc(userRef, {
      orders: arrayUnion({
        date: currentData,
        list: productReducer.cart,
        amount: productReducer.total,
      }),
    });
    //removing all the product's from cart
    thunkAPI.dispatch(clearCartThunk());
  }
);

const productSlice = createSlice({
  name: "product",
  // containing cart for the products,total no of products in side the cart , list of order placed by the user , total amount of products inside the cart
  initialState: {
    cart: [],
    itemInCart: 0,
    myorders: [],
    total: 0,
  },
  reducers: {
    // to initialize the myorder array on first render
    setMyOrders: (state, action) => {
      state.myorders = action.payload;
      return;
    },
    // increase quantity of a product in cart
    increaseProductQuantity: (state, action) => {
      const index = action.payload;
      state.cart.at(index).quantity++;
      return;
    },
    decreaseProductQuantity: (state, action) => {
      const index = action.payload;
      state.cart.at(index).quantity--;
      return;
    },

    // To intialize the cart array on the first render
    setCart: (state, action) => {
      state.cart = action.payload;
      return;
    },
    // to increase the total no of items in the cart
    increaseTotalItem: (state, action) => {
      state.itemInCart++;
      return;
    },
    // to increase the total amount of product inside the cart
    increaseTotalAmount: (state, action) => {
      state.total += action.payload;
      return;
    },
    // to decrease the total amount of products in the cart
    reduceTotalAmount: (state, action) => {
      state.total -= action.payload;
      return;
    },
  },
  extraReducers: (builder) => {
    // update the state after getting the data from database
    builder
      .addCase(getInitialCartOrdersThunk.fulfilled, (state, action) => {
        console.log('Fulfilled action payload :' , action.payload)
        const cart = action.payload;
        if (cart) {
          let sum = 0,
            len = 0;
          cart.map((item) => {
            Number((sum += item.price * item.quantity));
            Number((len += item.quantity));
          });
          state.total = sum;
          state.itemInCart = len;
          // Assuming you're setting the cart here
          if (state.cart) {
            state.cart = cart;
          }
        }
      })
      // update the state after increasing product quantity in cart and database
      .addCase(increaseQuantThunk.fulfilled, (state, action) => {
        state.itemInCart++;
      })
      .addCase(decreaseQuantThunk.fulfilled, (state, action) => {
        if (state.itemInCart > 1) {
          state.itemInCart--;
        }
      })
      //update state after removing product from cart and database
      .addCase(removeFromCartThunk.fulfilled, (state, action) => {
        const product = action.payload;

        // reduce item count and total amount
        state.total -= product.quantity * product.price;
        state.itemInCart -= product.quantity;
        // notification
        toast.success("Remove from Cart !!");
      })

      // update state after removing  all products from cart
      .addCase(clearCartThunk.fulfilled, (state, action) => {
        state.itemInCart = 0;
        state.total = 0;
        state.cart = [];
      });
  },
});

// exporting the reducer of slice
export const productReducer = productSlice.reducer;

// exporting all the actions from reducer
export const {
  setMyOrders,
  increaseProductQuantity,
  decreaseProductQuantity,
  setCart,
  increaseTotalItem,
  increaseTotalAmount,
  reduceTotalAmount,
} = productSlice.actions;

// exporting the state of reducer to get the data
export const productSelector = (state) => state.productReducer;
