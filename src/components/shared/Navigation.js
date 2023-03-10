import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export default function Navigation() {
  return (
    <Container>
      <Navbar
        expand="lg"
        variant="dark"
        fixed="top"
        style={{ background: "#000" }}
      >
        <Container>
          <Link to="/" className="navbar-brand">
            React JS Blog
          </Link>
        </Container>
      </Navbar>
    </Container>
  );
}
