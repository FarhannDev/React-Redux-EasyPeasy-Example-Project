import React, { Children } from "react";

export default function Container({ children }) {
  return (
    <div className="container">
      <div className="py-5 mt-5">
        <div className="d-block w-100">
          {Children.map(children, (child) => (
            <>{child}</>
          ))}
        </div>
      </div>
    </div>
  );
}
