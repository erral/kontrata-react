import React from "react"
import { Navbar as BootstrapNavbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Icon from './Icon';
import LanguageSelector from "./LanguageSelector";

function Navbar() {
    return (
        <BootstrapNavbar bg="light" expand="lg" class="mb-5">
            <Container>
                <BootstrapNavbar.Brand href="#home">Kontrata</BootstrapNavbar.Brand>

                <BootstrapNavbar.Collapse id="basic-navbar-nav" class="f-r">
                    <Nav className="me-auto">
                        <LanguageSelector />
                        <Nav.Link href="#home"><Icon name="github" /></Nav.Link>
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
}

export default Navbar;