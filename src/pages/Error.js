//react hook
import { useEffect } from "react";

// react router
import { useNavigate } from "react-router-dom";

//animation
import animatedData from "../../src/animation/O0owGSlzKT.json";
import Lottie from "react-lottie";
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
          width: "600px",
          height: "600px",
          margin: "0 auto",
        }}
      />
      <h3
        style={{
          fontWeight: "400",
          fontSize: "30px",
          fontFamily: "inherit",
          color: "GrayText",
        }}
      >
        Taking you back to the Home page...
      </h3>
    </div>
  );
}
