import React, { Children } from "react";
import Navigation from "./Navigation";

export default function Layout({ children }) {
  return (
    <>
      {/* Header */}
      <Navigation />
      {/* Main content */}
      <main className="container-fluid main-content">
        {Children.map(children, (child) => (
          <>{child}</>
        ))}
      </main>
      {/* Footer */}
    </>
  );
}
