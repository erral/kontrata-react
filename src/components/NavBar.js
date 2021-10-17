import React from "react"
import { Navbar as BootstrapNavbar, Container, Nav } from 'react-bootstrap';
import { EXTERNAL_LINKS } from "../constants";
import Icon from './Icon';
import LanguageSelector from "./LanguageSelector";

function Navbar() {
    return (
        <BootstrapNavbar bg="light" expand="lg"  className="mb-3">
            <Container>
                <BootstrapNavbar.Brand>Kontrata</BootstrapNavbar.Brand>

                <BootstrapNavbar.Collapse id="basic-navbar-nav" class="f-r">
                    <Nav className="me-auto">
                        <LanguageSelector />
                        <Nav.Link href={EXTERNAL_LINKS.GITHUB} target="_blank"><Icon name="github" size="28px"/></Nav.Link>
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
}

export default Navbar;