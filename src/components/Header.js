import React from 'react';
import '../assets/css/Header.css';
import { Container } from 'reactstrap';

function Header() {
    return (
        <div classNames="header">
            <Navbar dark expand="md" className="header__navbar">
                <Container className="header__container">

                </Container>
            </Navbar>
        </div>
    )
}

export default Header;
