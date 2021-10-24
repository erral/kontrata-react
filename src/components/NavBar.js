import React from "react";
import { Navbar as BootstrapNavbar, Container } from "react-bootstrap";

function Navbar({ children }) {
  return (
    <BootstrapNavbar expand="lg" className="mb-3" sticky="top">
      <Container>
        <BootstrapNavbar.Brand>Kontrata</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle />
        <BootstrapNavbar.Collapse className="justify-content-end">
          {children}
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
