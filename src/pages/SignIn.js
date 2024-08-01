// react hook
import { useRef } from "react";

// react router
import { NavLink, useNavigate } from "react-router-dom";

// css styles
import styles from "../styles/signIn.module.css";

// reducer actions Auth reducer
import { createSessionThunk } from "../Redux/Reducers/authReducer";
import { useDispatch } from "react-redux";

export function SignIn() {
  // for calling actions
  const dispatch = useDispatch();

  //navigated variable to navigate to some pages
  const navigate = useNavigate();

  //ref variables for email,password
  const emailRef = useRef();
  const passwordRef = useRef();

  // form submit function
  async function handleSubmit(e) {
    e.preventDefault();

    //storing user's data
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    //signin  user
    const status = dispatch(createSessionThunk(data));
    //if user signed in redirected to corresponding page
    status ? navigate("/") : navigate("/signin");
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputForm}>
        {/* heading*/}
        <h1>SignIn</h1>
        {/*form*/}
        <form onSubmit={handleSubmit}>
          {/*email*/}
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            required
            ref={emailRef}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            required
            ref={passwordRef}
          />
          <br />
          {/*submit button*/}
          <button>Submit</button>
        </form>
        <br />
        <span> or </span>
        {/*Link for sigup page*/}
        <NavLink to="/signup">
          <span className={styles.createAcc}> Create New Account</span>
        </NavLink>
      </div>
    </div>
  );
}
