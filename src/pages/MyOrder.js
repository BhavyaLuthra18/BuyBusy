// react hooks
import { useEffect, useState } from "react";

// react router
import { Link } from "react-router-dom";

// required component for Order Detail and Loading spinner
import OrderDetail from "../Component/MyOrder/OrderDetail";
import Loader from "../Component/Loader/Loader";

import { useSelector } from "react-redux";
import { productSelector } from "../Redux/Reducers/productReducer";

// css styles
import styles from "../styles/myorder.module.css";

// render my order page
export function MyOrder() {
  const { myorders } = useSelector(productSelector);

  // to show/hide loading spinner on the page
  const [isLoading, setLoading] = useState(true);

  // hide the spinner after a given time
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  return (
    // condition to show and hide the spinner
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.mainContainer}>
          {/* page heading*/}
          <h1 className={styles.orderHeading}>My Orders</h1>
          {/* to show message if no order in list*/}
          {myorders.length === 0 ? (
            <>
              {/* message of no order*/}
              <h1
                style={{
                  textAlign: "center",
                  margin: "0 auto",
                  fontWeight: "400",
                }}
              >
                You haven't placed any order yet !!
              </h1>
              {/*link to redirect to home page */}
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
                  width: "100px",
                  height: "25px",
                  whiteSpace: "nowrap",
                  marginTop: "50px",
                }}
              >
                {" "}
                Start Shopping
              </Link>
            </>
          ) : (
            //if contains order than render them one by one
            // order list container
            <div className={styles.orderListContainer}>
              {myorders.map((order, i) => (
                <OrderDetail key={i} order={order} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
