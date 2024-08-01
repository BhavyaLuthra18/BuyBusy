import {
  authSelector,
  removeSessionThunk,
} from "../../Redux/Reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
// css styles
import styles from "../../styles/navbar.module.css";

// import form react router
import { Outlet, NavLink } from "react-router-dom";

// import icons
import { HiShoppingBag } from "react-icons/hi2";
import { IoMdHome } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { FaBoxes } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { PiSignInBold } from "react-icons/pi";
// Navbar Component
export default function Navbar() {
  // for calling actions
  const dispatch = useDispatch();
  // user's login status from redux store
  const { isLoggedIn } = useSelector(authSelector);

  return (
    <>
      {/* main container */}
      <div className={styles.navbarContainer}>
        {/* app heading */}
        <div className={styles.appName}>
          <NavLink to="/">
            {/* logo of the app */}
            <h1 className={styles.main}>
              {" "}
              Buybusy
              <HiShoppingBag size={40} />
            </h1>
          </NavLink>
        </div>

        {/* all the navigation link */}
        <div className={styles.navLinks}>
          {/* homepage link */}
          <NavLink to="/">
            <span className={styles.homesection}>
              {/* home logo */}
              <IoMdHome size={28} /> Home
            </span>
          </NavLink>

          {/* myorder link */}
          {/* show when user is logged in */}
          {isLoggedIn && (
            <NavLink to="/myorder">
              <span className={styles.myorder}>
                {/* my order logo */}
                <FaBoxes size={25} /> My Order
              </span>
            </NavLink>
          )}

          {/* cart link */}
          {/* show when user is logged in */}
          {isLoggedIn && (
            <NavLink to="/cart">
              <span className={styles.cart}>
                {/* cart icon */}
                <FaShoppingCart size={25} /> Cart
              </span>
            </NavLink>
          )}

          {/* for signIN and signOut */}
          <NavLink to={!isLoggedIn ? "/signin" : "/"}>
            <span className={styles.signinandout}>
              {!isLoggedIn ? (
                <>
                  {/* sign in icon */}
                  <PiSignInBold size={25} /> SignIn
                </>
              ) : (
                <>
                  {/* sign out icon */}
                  {/* sign out user  */}
                  <span onClick={() => dispatch(removeSessionThunk())}>
                    {" "}
                    <PiSignOutBold size={25} /> SignOut
                  </span>
                </>
              )}
            </span>
          </NavLink>
        </div>
      </div>
      {/* render child pages */}
      <Outlet />
    </>
  );
}
