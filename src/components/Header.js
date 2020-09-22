import React, { useState } from 'react';
import '../assets/css/Header.css';
import { Collapse, Container, NavbarBrand, Navbar, NavItem, Nav, UncontrolledDropdown, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarToggler } from 'reactstrap';
import { NavLink } from 'react-router-dom';

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div classNames="header">
            <Navbar color="light" light expand="md" className="header__navbar">
                <Container className="header__navbar__container">
                    <NavbarToggler onClick={toggle} />
                    <NavbarBrand className="mr-auto header__navbar__container__logo" href="/">
                        Logo
                    </NavbarBrand>
                    <Collapse isOpen={isOpen} navbar>
                        <Nav navbar>
                            <NavItem className="header__navbar__container__navitem">
                                <NavLink className="nav-link" to="/videos">
                                    <span className="fa fa-video fa-lg"> Videos</span>
                                </NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Categories
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        Bags
                                    </DropdownItem>
                                    <DropdownItem>
                                        Clothes
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;
