import React from "react";

export default function Loading({ title }) {
  return (
    // <div className="d-flex justify-content-center align-selft-center">
    //   <div className="py-5 mt-5">{title}</div>
    // </div>
    <div className="loader">
      <div className="loading">{title}</div>
    </div>
  );
}
