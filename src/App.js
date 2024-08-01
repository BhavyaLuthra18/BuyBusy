// react router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from "react-toastify";
// all the pages and component to render
import Navbar from "./Component/Navbar/Navbar";
import { Home } from "./pages/Home";
import { MyOrder } from "./pages/MyOrder";
import { Cart } from "./pages/Cart";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Error } from "./pages/Error";

// main app function
function App() {
  // all the link routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> },
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
