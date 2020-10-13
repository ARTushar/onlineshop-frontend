import React, { useEffect, useState } from 'react';
import '../assets/css/Header.css';
import {
	Form,
	UncontrolledCollapse,
	Container,
	NavbarBrand,
	Navbar,
	NavItem,
	Nav,
	NavbarToggler,
	InputGroup,
	Input,
} from 'reactstrap';
import { Link, NavLink, useHistory } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Badge } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

function Header({fetchSearchProducts, totalProducts, auth , logoutUser }) {
	const history = useHistory();
	const [input, setInput] = useState('')

    const handleSubmit = (e) => {
		e.preventDefault();
		fetchSearchProducts(input)
		history.push('/search')
	}
	
    return (
			<div className='header'>
				<Navbar dark expand='md' className='header__navbar'>
					<Container className='header__navbar__container'>
						<NavbarToggler
							id='toggler'
							style={{ border: '0px', fontSize: '', outline: 'none' }}
						/>
						<Link to='/home'>
							<NavbarBrand className='header__navbar__container__logo' href='/'>
								<img src='/images/logo8.png' alt='logo' />
							</NavbarBrand>
						</Link>
						<Nav className='header__navbar__nav__search'>
							<NavItem className='header__navbar__nav__search__item'>
								<Form onSubmit={handleSubmit}>
									<InputGroup>
										<Input
											id='searchInput'
											placeholder='Search for products'
											className='header__search__input'
											value={input}
											onChange={(e) => setInput(e.target.value)}
										/>
										<button 
											type='submit'
											className='header__search__icon'
										>
											<SearchIcon style={{ fontSize: 30, color: '#1B1924' }} />
										</button>
									</InputGroup>
								</Form>
							</NavItem>
						</Nav>
						<UncontrolledCollapse
							navbar
							toggler='#toggler'
							className='header__navbar__collapse'
						>
							{/* <Nav navbar className="header__navbar__nav__left">
                            <NavItem className="header__navbar__couuuntainer__navitem">
                                <NavLink className="nav-link" to="/videos">
                                    <span className=""> Videos</span>
                                </NavLink>
                            </NavItem>
                        </Nav> */}
							<Nav navbar className='header__navbar__nav__right'>
								{auth.isAuthenticated ? (
									<NavItem className=' header__navbar__container__profile'>
										<NavLink className='nav-link' to='/profile'>
											<AccountCircleIcon fontSize='medium' />
										</NavLink>
									</NavItem>
								) : (
									''
								)}
								<NavItem className='header__navbar__container__cart'>
									<NavLink className='nav-link' to='/cart'>
										<Badge badgeContent={totalProducts} color='secondary'>
											<ShoppingCartIcon fontSize='medium' />
										</Badge>
									</NavLink>
								</NavItem>
								<NavItem className='header__navbar__container__loginregister'>
									{!auth.isAuthenticated ? (
										<Link className='nav-link mt-1' to='/login'>
											<span>Login/Register</span>
										</Link>
									) : (
										<span
											onClick={() =>
												logoutUser(auth.creds ? auth.creds.remember : false, history)
											}
											className='nav-link mt-1 logout__span'
										>
											Logout
										</span>
									)}
								</NavItem>
							</Nav>
						</UncontrolledCollapse>
					</Container>
				</Navbar>
				{/* <Row className="header__search">
                <InputGroup>
                    <Input placeholder="Search for products" className="header__search__input" />
                    <InputGroupAddon addonType="append" className="header__search__icon">
                        <SearchIcon style={{ fontSize: 30, color: "#1B1924" }} />
                    </InputGroupAddon>
                </InputGroup>
            </Row> */}
				{/* <Category /> */}
				<hr className='header__divider' />
			</div>
		);
}

export default Header;
