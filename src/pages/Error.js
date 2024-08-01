//react hook
import { useEffect } from "react";

// react router
import { useNavigate } from "react-router-dom";

//render error page
export function Error() {
  const navigate = useNavigate();

  //redirect to  homePage after 3 second
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 4000);
  });

  return (
    //Error message on screen
    <div style={{ textAlign: "center" }}>
      <h1>Error ,Something went wrong !!</h1>
      <h3>redirecting back to homePage....</h3>
      <img
        src="https://www.sidewalkdog.com/wp-content/uploads/2023/04/sad-dog-with-pink-background.jpg"
        alt="error-dg-img"
      />
    </div>
  );
}
