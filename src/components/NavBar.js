import React from "react";
import { Navbar as BootstrapNavbar, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Navbar({ children }) {
  return (
    <BootstrapNavbar expand="lg" className="mb-3" sticky="top">
      <Container>
        <BootstrapNavbar.Brand>
          <Link
            to={{
              languageroot: "/",
            }}
          >
            Kontrata
          </Link>
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle />
        <BootstrapNavbar.Collapse className="justify-content-end">
          {children}
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

Navbar.propTypes = {
  children: PropTypes.element,
};

export default Navbar;
