import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../Redux/Reducers/authReducer";
import {
  clearCartThunk,
  productSelector,
  purchaseAllThunk,
} from "../Redux/Reducers/productReducer";
import CartItem from "../Component/Cart/CartItem";
import Loader from "../Component/Loader/Loader";
import firstStyles from "../styles/home.module.css";
import secondStyles from "../styles/cart.module.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// Importing Lottie for animation
import Lottie from "react-lottie";
// Importing the animation JSON file
import animatedData from "../../src/animation/oh2QqLj2j4.json";

export function Cart() {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const { userLoggedIn } = useSelector(authSelector);
  const { cart, total, itemInCart } = useSelector(productSelector);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  function handlePurchase() {
    if (itemInCart === 0) {
      toast.error("Nothing to purchase in Cart!!");
      return;
    }

    dispatch(purchaseAllThunk());
    toast.success("Your order has been placed!!");
    navigate("/myorder");
  }

  function handleClear() {
    dispatch(clearCartThunk());
  }

  const getFormattedName = () => {
    if (!userLoggedIn || !userLoggedIn.name) return "";
    const firstName = userLoggedIn.name.split(" ")[0];
    return firstName.toUpperCase();
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={secondStyles.mainContainer}>
          <div className={secondStyles.header}>
            <div className={secondStyles.userInfo}>
              {userLoggedIn ? (
                <h1>
                  Hey {getFormattedName() || "Guest"},
                  <small>your cart has</small>
                </h1>
              ) : (
                <h1>
                  Hey ,<small>your cart has</small>
                </h1>
              )}
            </div>

            <div className={secondStyles.cartDetail}>
              <div>
                Item: {itemInCart}
                <br />
                <button
                  className={secondStyles.removeAll}
                  onClick={handleClear}
                >
                  Remove All
                </button>
              </div>

              <div>
                Total Amount : ₹{total}
                <br />
                <button
                  className={secondStyles.purchaseAll}
                  onClick={handlePurchase}
                >
                  Purchase All
                </button>
              </div>
            </div>
          </div>

          <div className={firstStyles.itemContainer}>
            {cart.length === 0 ? (
              <>
                <h1 className={secondStyles.nothingincart}>
                  Nothing in your Cart !!
                </h1>
                <Link
                  to="/"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    margin: "0 auto",
                    backgroundColor: "#892BE1",
                    padding: "10px",
                    color: "white",
                    borderRadius: "10px",
                    fontWeight: "500",
                    textDecoration: "none",
                  }}
                >
                  {" "}
                  Start Shopping
                </Link>
                {/* Lottie animation for empty cart */}
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: animatedData,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                  height={400}
                  width={400}
                />
              </>
            ) : (
              cart.map((product, i) => <CartItem key={i} product={product} />)
            )}
          </div>
        </div>
      )}
    </>
  );
}
