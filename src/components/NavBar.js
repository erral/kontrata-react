import React from "react"
import { Navbar as BootstrapNavbar, Container, Nav } from 'react-bootstrap';

function Navbar({ children }) {
    return (
        <BootstrapNavbar bg="light" expand="lg" className="mb-3">
            <Container>
                <BootstrapNavbar.Brand>Kontrata</BootstrapNavbar.Brand>

                <BootstrapNavbar.Collapse id="basic-navbar-nav" class="f-r">
                    <Nav className="me-auto">
                        {children}
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
}

export default Navbar;