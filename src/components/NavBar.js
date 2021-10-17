import React from "react"
import { Navbar as BootstrapNavbar, Container, Nav } from 'react-bootstrap';
import { EXTERNAL_LINKS } from "../constants";
import Icon from './Icon';
import LanguageSelector from "./LanguageSelector";

function Navbar() {
    return (
        <BootstrapNavbar bg="light" expand="lg" class="mb-5">
            <Container>
                <BootstrapNavbar.Brand>Kontrata</BootstrapNavbar.Brand>

                <BootstrapNavbar.Collapse id="basic-navbar-nav" class="f-r">
                    <Nav className="me-auto">
                        <LanguageSelector />
                        <Nav.Link href={EXTERNAL_LINKS.GITHUB} target="_blank"><Icon name="github" /></Nav.Link>
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
}

export default Navbar;