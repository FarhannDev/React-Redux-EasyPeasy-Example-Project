import React, { Children } from "react";

export default function Box({ children }) {
  return (
    <>
      <div className="d-flex justify-content-center align-content-center flex-column">
        {Children.map(children, (child) => (
          <>{child}</>
        ))}
      </div>
    </>
  );
}
