// react ref hook
import { useRef } from "react";

// navigation router
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { createUserThunk } from "../Redux/Reducers/authReducer";

// css styles
import styles from "../styles/signIn.module.css";

//signup page

export function SignUp() {
  // ref variables for name ,email , password
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  //navigate variable
  const navigate = useNavigate();

  // for calling actions
  const dispatch = useDispatch();

  //handle form submit
  function handleSubmit(e) {
    e.preventDefault();

    //storing user's data
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    console.log("signup done");
    //creating user
    dispatch(createUserThunk(data));
    // if user created redirect to corresponding page
    navigate("/signin");
  }

  return (
    <>
      {/*main container*/}
      <div className={styles.container}>
        <div className={styles.inputForm}>
          {/* heading*/}
          <h1>SignUp</h1>
          {/* form to get user's data */}
          <form onSubmit={handleSubmit}>
            {/* for name*/}
            <input type="text" placeholder="Name" required ref={nameRef} />
            {/* for email*/}
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              required
              ref={emailRef}
            />
            {/* for password*/}
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              required
              ref={passwordRef}
            />
            {/* Submit Button*/}
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
