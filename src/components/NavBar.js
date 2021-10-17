import React from "react"
import { Navbar as BootstrapNavbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Icon from './Icon';

function Navbar() {
    return (
        <BootstrapNavbar bg="light" expand="lg" class="mb-5">
            <Container>
                <BootstrapNavbar.Brand href="#home">Kontrata</BootstrapNavbar.Brand>

                <BootstrapNavbar.Collapse id="basic-navbar-nav" class="f-r">
                    <Nav className="me-auto">
                        <NavDropdown title="Language" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Euskara</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Español</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#home"><Icon name="github" /></Nav.Link>
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
}

export default Navbar;