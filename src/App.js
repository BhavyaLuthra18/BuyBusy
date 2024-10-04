import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from "react-toastify";
import Navbar from "./Component/Navbar/Navbar";
import { Home } from "./pages/Home";
import { MyOrder } from "./pages/MyOrder";
import { Cart } from "./pages/Cart";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Error } from "./pages/Error";
import { data } from "./Assets/data"; // Import the data for filtering

function App() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data); // Initialize with the full data set

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar
            search={search}
            setSearch={setSearch}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            data={data} // Pass the data to Navbar for filtering
          />
        </>
      ),
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: (
            <Home
              search={search}
              filteredData={filteredData} // Pass the filtered data to Home
              setFilteredData={setFilteredData}
            />
          ),
        },
        { path: "/myorder", element: <MyOrder /> },
        { path: "/cart", element: <Cart /> },
        { path: "/signin", element: <SignIn /> },
        { path: "/signup", element: <SignUp /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
