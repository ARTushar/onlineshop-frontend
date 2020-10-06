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
import Checkout from './Checkout';

import { actions } from 'react-redux-form';
import { UserContext, CartContext, AuthContext } from '../Context/context';

import { addToWishlist, addToCart, fetchProductDetails, removeFromCart, removeFromWishlist, updateDeliveryCost, updateQuantity, postOrder, addSingleProduct, removeSingleProduct, loginUser, logoutUser, registerUser, clearRegsiter } from '../redux/actionCreators';
import OrderInvoice from './OrderInvoice';

const mapDispatchToProps = (dispatch) => ({
  resetSignUpForm: () => dispatch(actions.reset('user')),
  fetchProductDetails: (productTitle) => dispatch(fetchProductDetails(productTitle)),
  addToCart: (product) => dispatch(addToCart(product)),
  removeFromCart: (productId) => dispatch(removeFromCart(productId)),
  updateQuantity: (productId, quantity) => dispatch(updateQuantity(productId, quantity)),
  updateDeliveryCost: (cost) => dispatch(updateDeliveryCost(cost)),
  addToWishlist: (product) => dispatch(addToWishlist(product)),
  removeFromWishlist: (productId) => dispatch(removeFromWishlist(productId)),
  postOrder: (order, fromBuy) => dispatch(postOrder(order, fromBuy)),
  addSingleProduct: (product) => dispatch(addSingleProduct(product)),
  removeSingleProduct: () => dispatch(removeSingleProduct()),
  loginUser: (creds, remember) => dispatch(loginUser(creds, remember)),
  logoutUser: (remember) => dispatch(logoutUser(remember)),
  registerUser: (user) => dispatch(registerUser(user)),
  clearRegsiter: () => dispatch(clearRegsiter()),
});

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    selectedProduct: state.products.selectedProduct,
    cart: state.cart,
    wishlist: state.wishlist,
    user: state.user,
    orders: state.order.orders,
    singleProduct: state.order.singleProduct,
    auth: state.auth,
    register: state.register
  };
};

function Main(props) {
  const location = useLocation();
  // console.log(location.pathname);

  const ProductDetailsWithSlug = ({ match }) => {
    // console.log('match: l' + JSON.stringify(match));
    // console.log('before state : ' + props.selectedProduct);
    props.fetchProductDetails(match.params.slug);
    // console.log('after state : ' + props.selectedProduct);
    return (
      <React.Fragment>
        <Header  logoutUser={props.logoutUser} auth={props.auth}  totalProducts={props.cart.products.length} />
        <CartContext.Provider value={{
          addToCart: props.addToCart,
          addSingleProduct: props.addSingleProduct
        }}>
          <ProductDetails selectedProduct={props.selectedProduct} addToWishlist={props.addToWishlist} />
        </CartContext.Provider>
        <Footer />
      </React.Fragment>
    );
  }

  const OrderInvoiceComponent = ({ match }) => (
    <>
      <Header logoutUser={props.logoutUser} auth={props.auth} totalProducts={props.cart.products.length} />
      <OrderInvoice order_no={match.params.order_no} orders={props.orders} />
      <Footer />
    </>
  );

  return (
    <div className="main">
      <Switch>
        <Route path="/home">
          <Header logoutUser={props.logoutUser} auth={props.auth}  totalProducts={props.cart.products.length} />
          <Home />
          <Footer />
        </Route>
        <Route path="/product/:slug" component={ProductDetailsWithSlug} />
        <Route path="/cart" >
          <Header logoutUser={props.logoutUser} auth={props.auth}  totalProducts={props.cart.products.length} />
          <CartContext.Provider value={{
            removeFromCart: props.removeFromCart,
            cartProducts: props.cart.products,
            updateQuantity: props.updateQuantity,
            updateDeliveryCost: props.updateDeliveryCost,
            deliveryCost: props.cart.deliveryCost,
            updateDeliveryCost: props.updateDeliveryCost,
          }}>
            <Cart />
          </CartContext.Provider>
          <Footer />

        </Route>
        <Route path="/checkout">
          <Header logoutUser={props.logoutUser} auth={props.auth} totalProducts={props.cart.products.length} />
          <Checkout
            cartProducts={props.cart.products}
            deliveryCost={props.cart.deliveryCost}
            userInformation={props.user}
            postOrder={props.postOrder}
            singleProduct={props.singleProduct}
            removeSingleProduct={props.removeSingleProduct}
          />
          <Footer />
        </Route>
        <Route path="/purchase">
          <Header logoutUser={props.logoutUser} auth={props.auth} totalProducts={props.cart.products.length} />
          <Purchase />
          <Footer />
        </Route>
        <Route path="/profile">
          <Header logoutUser={props.logoutUser}  auth={props.auth}  totalProducts={props.cart.products.length} />
          <UserContext.Provider value={{
            wishlistProducts: props.wishlist.products,
            removeFromWishlist: props.removeFromWishlist,
            orders: props.orders,
          }}>
            <Profile />
          </UserContext.Provider>
          <Footer />
        </Route>
        <Route path="/videos">
          <Header logoutUser={props.logoutUser} auth={props.auth} totalProducts={props.cart.products.length} />
          <Videos />
          <Footer />
        </Route>
        <Route exact path="/login">
          <AuthContext.Provider value={{
            loginUser: props.loginUser,
            auth: props.auth
          }}>
            <LoginRegister type="login" />
          </AuthContext.Provider>
        </Route>
        <Route exact path="/register">
          <AuthContext.Provider value={{
            registerUser: props.registerUser,
            register: props.register,
            loginUser: props.loginUser,
            clearRegsiter: props.clearRegsiter
          }}>
            <LoginRegister type="register" />
          </AuthContext.Provider>
        </Route>
        <Route path="/search">
          <Header  logoutUser={props.logoutUser} auth={props.auth} totalProducts={props.cart.products.length} />
          <Search />
          <Footer />
        </Route>
        <Route path="/order/:order_no" component={OrderInvoiceComponent} />

        <Redirect to='/home' />
      </Switch>
    </div>
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
