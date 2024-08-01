// react hooks
import { useEffect, useState } from "react";

// react router
import { useNavigate } from "react-router-dom";

// redux tools for calling actions and getting data from store
import { useDispatch, useSelector } from "react-redux";

// actions from Auth and Product Reducers
import { authSelector } from "../Redux/Reducers/authReducer";
import {
  clearCartThunk,
  productSelector,
  purchaseAllThunk,
} from "../Redux/Reducers/productReducer";

// required component's
// single cartItem
import CartItem from "../Component/Cart/CartItem";
// page loader
import Loader from "../Component/Loader/Loader";

// css styles
// styles from other css file
import firstStyles from "../styles/home.module.css";
// styles for cart.js
import secondStyles from "../styles/cart.module.css";

// for toast notification
import { toast } from "react-toastify";

// render the cart page
export function Cart() {
  // for calling actions
  const dispatch = useDispatch();

  //to show/hide the loading spinner on the page
  const [isLoading, setLoading] = useState(true);

  // data of user from auth Reducer
  const { userLoggedIn } = useSelector(authSelector);

  // data of cart items from Product Reducer
  const { cart, total, itemInCart } = useSelector(productSelector);

  // to navigate to some page
  const navigate = useNavigate();

  //to hide loading spinner after given time

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  // purchase button handle

  function handlePurchase() {
    // if cart empty return
    if (itemInCart === 0) {
      toast.error("Nothing to purchase in Cart!!");
      return;
    }

    //purchase function
    dispatch(purchaseAllThunk());

    //show notification
    toast.success("your order has been placed !!");

    // navigate to myorder page
    navigate("/myorder");
  }

  function handleClear() {
    dispatch(clearCartThunk());
  }

  return (
    <>
      {/*Condition to show/hide loading spinner*/}
      {isLoading ? (
        <Loader />
      ) : (
        //main container of the page
        <div className={secondStyles.mainContainer}>
          {/*header within the page to show cart details */}
          <div className={secondStyles.header}>
            {/* welcome message */}
            <div className={secondStyles.userInfo}>
              {userLoggedIn ? (
                <h1>
                  Hey {userLoggedIn.name},<small>your cart has</small>
                </h1>
              ) : (
                <h1>
                  Hey ,<small>your cart has</small>
                </h1>
              )}
            </div>

            {/* cart detail and purchase button */}
            <div className={secondStyles.cartDetail}>
              <div>
                {/*item within the cart*/}
                Item:{itemInCart}
                <br />
                {/* button to empty cart */}
                <button
                  className={secondStyles.removeAll}
                  onClick={handleClear}
                >
                  Remove All
                </button>
              </div>

              <div>
                {/*total amount of all the products within the cart*/}
                Total Amount :₹{total}
                <br />
                {/* button to purchase from cart*/}
                <button
                  className={secondStyles.purchaseAll}
                  onClick={handlePurchase}
                >
                  Purchase All
                </button>
              </div>
            </div>
          </div>

          {/* rendering all the products within the user's cart */}

          <div className={firstStyles.itemContainer}>
            {/* if cart is empty  */}
            {cart.length === 0 ? (
              // render this msg
              <h1>Nothing in your Cart !!</h1>
            ) : (
              // else render all the product's one  by one
              cart.map((product, i) => <CartItem key={i} product={product} />)
            )}
          </div>
        </div>
      )}
    </>
  );
}
