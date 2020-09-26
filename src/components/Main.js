import React from 'react';
import '../assets/css/Main.css';
import { Switch, Route, Redirect, withRouter, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import Videos from './Videos';
import Profile from './Profile';
import Cart from './Cart';
import Purchase from './Purchase';
import ProductDetails from './ProductDetails';
import LoginRegister from './LoginRegister';
import Search from './Search';
import { actions } from 'react-redux-form';
import { UserContext } from '../Context/context';


const mapDispatchToProps = (dispatch) => ({
  resetSignUpForm: () => { dispatch(actions.reset('user'))}
});

function Main(props) {
    const location = useLocation();
    console.log(location.pathname)

    return (
        <div className="main">
            <Switch>
                <Route path="/home">
                    <Header />
                    <Home />
                    <Footer />
                </Route>
                <Route path="/productdetails">
                    <Header />
                    <ProductDetails />
                    <Footer />
                </Route>
                <Route path="/cart" >
                    <Header />
                    <Cart />
                    <Footer />
                </Route>
                <Route path="/purchase">
                    <Header />
                    <Purchase />
                    <Footer />
                </Route>
                <Route path="/profile">
                    <Header />
                    <Profile />
                    <Footer />
                </Route>
                <Route path="/videos">
                    <Header />
                    <Videos />
                    <Footer />
                </Route>
                <Route exact path="/login">
                    <LoginRegister type="login"/>
                </Route>
                <Route exact path="/register">
                    <UserContext.Provider value={props.resetSignUpForm}>
                        <LoginRegister type="register" />
                    </UserContext.Provider>
                </Route>
                <Route path="/search">
                    <Header />
                    <Search />
                    <Footer />
                </Route>
                <Redirect to="/home" />
            </Switch>
        </div>
    )
};

export default withRouter(connect(null, mapDispatchToProps)(Main));
