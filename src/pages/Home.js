import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  authSelector,
  getInititialUserList,
  setLoggedIn,
  setUserLoggedIn,
} from "../Redux/Reducers/authReducer";
import { getInitialCartOrdersThunk } from "../Redux/Reducers/productReducer";
import Banner from "../Component/Home/Banner";
import FilterBar from "../Component/Home/FilterBar";
import MainContent from "../Component/Home/MainContent";
import styles from "../styles/home.module.css";
import Loader from "../Component/Loader/Loader";

export function Home({ search }) {
  const dispatch = useDispatch();
  const { isLoggedIn, userLoggedIn } = useSelector(authSelector);
  const [isLoading, setLoading] = useState(true);
  const [price, setPrice] = useState(5000);
  const [category, setCategory] = useState("none");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    dispatch(getInitialCartOrdersThunk());
  }, [userLoggedIn]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);

    const token = window.localStorage.getItem("token");
    const index = window.localStorage.getItem("index");
    const user = JSON.parse(index);
    dispatch(setLoggedIn(token));
    dispatch(setUserLoggedIn(user));
  }, []);

  useEffect(() => {
    dispatch(getInititialUserList());
  }, [isLoggedIn]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div style={{ margin: "0 auto" }}>
          <Banner />
          <div className={styles.mainContainer}>
            <FilterBar
              price={price}
              setPrice={setPrice}
              setCategory={setCategory}
            />
            <MainContent
              price={price}
              setPrice={setPrice}
              category={category}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              search={search} // Pass search state to MainContent
              applyFilter={true}
            />
          </div>
        </div>
      )}
    </>
  );
}

