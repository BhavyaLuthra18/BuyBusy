import React from "react";

const Banner = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <img
          src="/images/electronicad2.jpeg"
          width={300}
          height={300}
          alt="banner"
        />
        <img src="/images/mid.jpeg" width={600} height={300} alt="banner" />
        <img
          src="/images/menfashion.jpeg"
          width={300}
          height={300}
          alt="banner"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <img
          src="/images/fashion1.jpeg"
          width={300}
          height={300}
          alt="banner"
        />
        <img src="/images/mid2.jpeg" width={600} height={300} alt="banner" />
        <img
          src="/images/fashion3.jpeg"
          width={300}
          height={300}
          alt="banner"
        />
      </div>
    </div>
  );
};

export default Banner;
