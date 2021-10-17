import React from "react"
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Icon from "./Icon";
function NavBar() {

    return (
        <Navbar bg="light" expand="lg" class="mb-5">
            <Container>
                <Navbar.Brand href="#home">Kontrata</Navbar.Brand>

                <Navbar.Collapse id="basic-navbar-nav" class="f-r">
                    <Nav className="me-auto">
                        <NavDropdown title="Language" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Euskara</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Español</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#home"><Icon name="github"/></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;