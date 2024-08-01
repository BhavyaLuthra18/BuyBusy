// react hooks
import { useState, useEffect } from "react";

// redux tools
import { useDispatch, useSelector } from "react-redux";

// actions of Auth and Product Reducers
import {
  authSelector,
  getInititialUserList,
  setLoggedIn,
  setUserLoggedIn,
} from "../Redux/Reducers/authReducer";
import { getInitialCartOrdersThunk } from "../Redux/Reducers/productReducer";

// required components filter and main content
import FilterBar from "../Component/Home/FilterBar";
import MainContent from "../Component/Home/MainContent";

// css styles
import styles from "../styles/home.module.css";

// show loading spinner on first render
import Loader from "../Component/Loader/Loader";

export function Home() {
  // for calling actions
  const dispatch = useDispatch();

  const { isLoggedIn, userLoggedIn } = useSelector(authSelector);
  // loading status by default true
  const [isLoading, setLoading] = useState(true);

  // to whether show/hide the filter bar on Homepage
  const [applyFilter, setApplyFilter] = useState(false);

  // to filter item on the basis of price and item category
  const [price, setPrice] = useState(5000);
  const [category, setCategory] = useState("none");

  // for search item
  const [search, setSearch] = useState("");

  // get the initial data of cart and previous  orders history
  useEffect(() => {
    dispatch(getInitialCartOrdersThunk());
  }, [userLoggedIn]);

  //hide loader spinner
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);

    // getting user's token from local storage on first render
    const token = window.localStorage.getItem("token");
    // if user is logged in
    // getting loggedIn user's data
    const index = window.localStorage.getItem("index");
    const user = JSON.parse(index);
    //set token and loggedIN user
    dispatch(setLoggedIn(token));
    dispatch(setUserLoggedIn(user));
  }, []);

  // get list of all the user's in database
  useEffect(() => {
    dispatch(getInititialUserList());
  }, [isLoggedIn]);

  // return component
  return (
    <>
      {/* checking whether to show/hide loading spinner */}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* page header */}
          <div className={styles.header}>
            {/* search bar */}
            <input
              type="text"
              placeholder="Search Item...."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* apply filter button  */}
            {/* show/hide on button click */}
            <button onClick={() => setApplyFilter(!applyFilter)}>
              {applyFilter ? "Cancel" : "Apply Filter"}
            </button>
          </div>
          {/* rendering all the products and filter bar */}
          <div className={styles.mainContainer}>
            {/* is applyFilter "true" then render it  */}
            {applyFilter && (
              <FilterBar
                price={price}
                setPrice={setPrice}
                setCategory={setCategory}
              />
            )}
            {/* show all the products */}
            {/* props to apply filter on the products */}
            <MainContent
              search={search}
              price={price}
              category={category}
              applyFilter={applyFilter}
            />
          </div>
        </>
      )}
    </>
  );
}
