import React from 'react';
import '../assets/css/Main.css';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import Videos from './Videos';
import UserProfile from './UserProfile';
import Cart from './Cart';
import Purchase from './Purchase';
import ProductDetails from './ProductDetails';

function Main() {
    return (
        <div className="main">
            <Header />
            <Switch>
                <Route path="/home" component={() => <Home />}/>
                <Route path="/productdetails" component={()=> <ProductDetails />}/>
                <Route path="/cart" component={()=> <Cart />} />
                <Route path="/purchase" component={()=> <Purchase />} />
                <Route path="/userprofile" component={()=> <UserProfile />} />
                <Route path="/videos" component={()=> <Videos />} />
                <Redirect to="/home" />
                
            </Switch>
            <Footer />
        </div>
    )
};

export default Main;