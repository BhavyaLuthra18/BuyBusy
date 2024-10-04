import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  authSelector,
  removeSessionThunk,
} from "../../Redux/Reducers/authReducer";
import { Outlet, NavLink } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi2";
import { IoMdHome } from "react-icons/io";
import { FaShoppingCart, FaBoxes } from "react-icons/fa";
import { PiSignOutBold, PiSignInBold } from "react-icons/pi";
import styles from "../../styles/navbar.module.css";
import animatedData from "../../animation/b31CIf4gdo.json";
import Lottie from "react-lottie";
import { cartSelector } from "../../Redux/Reducers/cartReducer";

export default function Navbar({ search, setSearch }) {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(authSelector);
  const cartItems = useSelector(cartSelector) || [];
  const cartCount = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;
  const [searchInput, setSearchInput] = useState("");

  // Update the search state based on the search input
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setSearch(value);
  };

  return (
    <>
      <div className={styles.navbarContainer}>
        <div className={styles.appName}>
          <NavLink to="/" className={styles.main}>
            {/* Apply class to NavLink for no underline */}
            Buybusy
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                resizeMode: "center",
                animationData: animatedData,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              style={{
                width: "100px",
                height: "100px",
                marginLeft: "-10%",
                marginTop: "-2%",
              }}
            />
          </NavLink>
        </div>

        {/* Search Input wrapped in a div for styling */}
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search Item...."
            value={searchInput}
            onChange={handleSearchInputChange}
            style={{
              width: "80%",
              height: "40px",
              borderRadius: "10px",
              border: "2px solid white",
              padding: "0 10px",
            }}
          />
        </div>

        <div className={styles.navLinks}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${styles.homesection} ${styles.active}`
                : styles.homesection
            }
          >
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "6px",
              }}
            >
              <IoMdHome
                size={24}
                style={{
                  marginRight: "6px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />{" "}
              Home
            </span>
          </NavLink>

          {isLoggedIn && (
            <>
              <NavLink
                to="/myorder"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.myorder} ${styles.active}`
                    : styles.myorder
                }
              >
                <span style={{ marginRight: "8px", display: "flex" }}>
                  <FaBoxes size={24} style={{ marginRight: "8px" }} /> My Order
                </span>
              </NavLink>

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? `${styles.cart} ${styles.active}` : styles.cart
                }
              >
                <span style={{ display: "flex" }}>
                  {/*---Conditionally render the cart count only if it's greater than 0----*/}
                  {cartCount > 0 && <span className={styles.cartcount}>{cartCount}</span>}
                  <FaShoppingCart
                    size={24}
                    style={{ marginRight: "8px", marginLeft:cartCount > 0 ? "14px":"0px"}}
                  />{" "}
                  Cart
                </span>
              </NavLink>
            </>
          )}

          <NavLink to={!isLoggedIn ? "/signin" : "/"}>
            <span className={styles.signinandout}>
              {!isLoggedIn ? (
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <PiSignInBold size={24} style={{ marginRight: "8px" }} />
                  SignIn
                </span>
              ) : (
                <span
                  onClick={() => dispatch(removeSessionThunk())}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <PiSignOutBold size={24} style={{ marginRight: "8px" }} />
                  SignOut
                </span>
              )}
            </span>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </>
  );
}
