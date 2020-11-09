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
} from 'reactstrap';
import { Link, NavLink, useHistory } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Badge } from '@material-ui/core';
import Category from './Category';
import SearchBar from 'material-ui-search-bar';


function Header({ categories, fetchCategories, categoriesLoaded, setCurrentSearched, currentSearched, fetchSearchProducts, totalProducts, auth, logoutUser }) {
  const history = useHistory();
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    // e.preventDefault();
    if(input.length === 0) return;
    if (history.location.pathname !== '/search') {
      history.push('/search')
    }
    if (currentSearched !== input) {
      setCurrentSearched(input);
      fetchSearchProducts(input);
    }
  }

  useEffect(() => {
    if (!categoriesLoaded) {
      fetchCategories()
    }
  }, [])

  return (
    <div className='header'>
      <Navbar dark expand='md' className='header__navbar'>
        <Container className='header__navbar__container'>
          <NavbarToggler
            id='toggler'
            style={{ border: '0px', fontSize: '', outline: 'none' }}
          />
          <NavbarBrand className='header__navbar__container__logo' href='/home'>
            <img src='/images/logo8.png' alt='logo' />
          </NavbarBrand>
          <Nav navbar>
            <NavItem className=' header__navbar__container__categories'>
              <div className='nav-link header__categories'>
                <Category className="header__navbar__" categories={categories} />
              </div>
            </NavItem>
          </Nav>

          <Nav navbar className='header__navbar__nav__search'>

            <NavItem className='header__navbar__nav__search__item'>
              {/* <Form onSubmit={handleSubmit}>
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
              </Form> */}
              <SearchBar
                value={input}
                onChange={(newVal) => setInput(newVal)}
                onRequestSearch={handleSubmit}
                placeholder="Search for products..."
                className="header__search__input"
              />
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
                    <AccountCircleIcon />
                  </NavLink>
                </NavItem>
              ) : (
                  ''
                )}
              <NavItem className='header__navbar__container__cart'>
                <NavLink className='nav-link' to='/cart'>
                  <Badge badgeContent={totalProducts} color='secondary'>
                    <ShoppingCartIcon />
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
