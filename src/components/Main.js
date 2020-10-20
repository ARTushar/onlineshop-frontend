import React from 'react';
import '../assets/css/Main.css';
import { Switch, Route, Redirect, withRouter, useLocation, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import Profile from './Profile';
import Cart from './Cart';
import ProductDetails from './ProductDetails';
import LoginRegister from './LoginRegister';
import Search from './Search';
import Checkout from './Checkout';

import { actions } from 'react-redux-form';
import { UserContext, CartContext, AuthContext } from '../Context/context';

import { addToWishlist, addToCart, fetchProductDetails, removeFromCart, removeFromWishlist, updateDeliveryCost, updateQuantity, postOrder, addSingleProduct, removeSingleProduct, loginUser, logoutUser, registerUser, clearRegsiter, loginUserThirdParty, fetchHomeProducts, setCurrentSlug, fetchSearchProducts, deleteProductDetails, fetchSelectedOrder, fetchProfile, updateProfile, postQuestion, clearQuestionPosted, postReview, clearReviewPosted, fetchOrders, setCurrentSearched } from '../redux/actionCreators';
import OrderInvoice from './OrderInvoice';
import ScrollToTop from './ScrollToTop';

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
  loginUser: (creds, remember, history) => dispatch(loginUser(creds, remember, history)),
  logoutUser: (remember, history) => dispatch(logoutUser(remember, history)),
  registerUser: (user) => dispatch(registerUser(user)),
  clearRegsiter: () => dispatch(clearRegsiter()),
  loginUserThirdParty: (creds, provider, history) => dispatch(loginUserThirdParty(creds, provider, history)),
  fetchHomeProducts: () => dispatch(fetchHomeProducts()),
  fetchSearchProducts: (searchInput) => dispatch(fetchSearchProducts(searchInput)),
  setCurrentSlug: (currentSlug) => dispatch(setCurrentSlug(currentSlug)),
  deleteProductDetails: () => dispatch(deleteProductDetails()),
  fetchSelectedOrder: (orders, orderId) => dispatch(fetchSelectedOrder(orders, orderId)),
  fetchProfile: () => dispatch(fetchProfile()),
  updateProfile: (profile) => dispatch(updateProfile(profile)),
  postQuestion: (question, productId) => dispatch(postQuestion(question, productId)),
  clearQuestionPosted: () => dispatch(clearQuestionPosted()),
  postReview: (review, productId) => dispatch(postReview(review, productId)),
  clearReviewPosted: () => dispatch(clearReviewPosted()),
  fetchOrders: () => dispatch(fetchOrders()),
  setCurrentSearched: (currentSearched) => dispatch(setCurrentSearched(currentSearched)),
});

const mapStateToProps = (state) => {
  return {
    selectedProduct: state.products.selectedProduct,
    cart: state.cart,
    wishlist: state.wishlist,
    user: state.user,
    orders: state.order.orders,
    orderLoaded: state.order.orderLoaded,
    singleProduct: state.order.singleProduct,
    auth: state.auth,
    register: state.register,
    homeProducts: state.products.homeProducts,
    searchProducts: state.products.searchProducts,
    currentSlug: state.products.currentSlug,
    selectedOrder: state.order.selectedOrder,
    questionPosted: state.products.questionPosted,
    reviewPosted: state.order.reviewPosted,
    ordersLoading: state.order.isLoading,
    currentSearched: state.products.currentSearched,
    productsLoading: state.products.isLoading,
    productsError: state.products.errMess,
  };
};

function Main(props) {
  const location = useLocation();
  // console.log(location.pathname);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(prop) => (
      props.auth.isAuthenticated
        ? <Component {...prop} />
        : <Redirect to={{
          pathname: '/home',
          state: { from: location }
        }} />
    )} />
  );

  const ProductDetailsWithSlug = () => {
    // console.log('match: l' + JSON.stringify(match));
    // console.log('before state : ' + props.selectedProduct);
    // console.log('after state : ' + props.selectedProduct);
    const { slug } = useParams();
    return (
      <>
        <Header setCurrentSearched={props.setCurrentSearched} currentSearched={props.currentSearched} fetchSearchProducts={props.fetchSearchProducts} logoutUser={props.logoutUser} auth={props.auth} totalProducts={props.cart.products.length} />
        <CartContext.Provider value={{
          addToCart: props.addToCart,
          addSingleProduct: props.addSingleProduct,
          slug,
          currentSlug: props.currentSlug,
          setCurrentSlug: props.setCurrentSlug,
          fetchProductDetails: props.fetchProductDetails,
          productsLoading: props.productsLoading,
          productsError: props.productsError,
          deleteProductDetails: props.deleteProductDetails,
          postQuestion: props.postQuestion,
          questionPosted: props.questionPosted,
          clearQuestionPosted: props.clearQuestionPosted,
          isAuthenticated: props.auth.isAuthenticated
        }}>
          <ProductDetails selectedProduct={props.selectedProduct} addToWishlist={props.addToWishlist} />
        </CartContext.Provider>
        <Footer />
      </>
    );
  }

  const OrderInvoiceComponent = () => {
    const { order_no } = useParams();
    return (
      <React.Fragment>
        <Header setCurrentSearched={props.setCurrentSearched} currentSearched={props.currentSearched} fetchSearchProducts={props.fetchSearchProducts} logoutUser={props.logoutUser} auth={props.auth} totalProducts={props.cart.products.length} />
        <OrderInvoice clearReviewPosted={props.clearReviewPosted} reviewPosted={props.reviewPosted} postReview={props.postReview} order_no={order_no} orders={props.orders} />
        <Footer />
      </React.Fragment>
    );
  };

  return (
    <div className="main">
      <ScrollToTop />
      <Switch>
        <Route path="/home">
          <Header setCurrentSearched={props.setCurrentSearched} currentSearched={props.currentSearched} fetchSearchProducts={props.fetchSearchProducts} logoutUser={props.logoutUser} auth={props.auth} totalProducts={props.cart.products.length} />
          <Home productsLoading={props.productsLoading} productsError={props.productsError} homeProducts={props.homeProducts} fetchHomeProducts={props.fetchHomeProducts} />
          <Footer />
        </Route>
        <Route path="/product/:slug" component={ProductDetailsWithSlug} />

        <Route path="/cart" >
          <Header setCurrentSearched={props.setCurrentSearched} currentSearched={props.currentSearched} fetchSearchProducts={props.fetchSearchProducts} logoutUser={props.logoutUser} auth={props.auth} totalProducts={props.cart.products.length} />
          <CartContext.Provider value={{
            removeFromCart: props.removeFromCart,
            cartProducts: props.cart.products,
            updateQuantity: props.updateQuantity,
            deliveryCost: props.cart.deliveryCost,
            updateDeliveryCost: props.updateDeliveryCost,
          }}>
            <Cart />
          </CartContext.Provider>
          <Footer />

        </Route>
        <Route path="/checkout">
          {props.auth.isAuthenticated ? (
            <>
              <Header setCurrentSearched={props.setCurrentSearched} currentSearched={props.currentSearched} fetchSearchProducts={props.fetchSearchProducts} logoutUser={props.logoutUser} auth={props.auth} totalProducts={props.cart.products.length} />
              <Checkout
                cartProducts={props.cart.products}
                deliveryCost={props.cart.deliveryCost}
                userInformation={props.user.profileInformation}
                postOrder={props.postOrder}
                singleProduct={props.singleProduct}
                removeSingleProduct={props.removeSingleProduct}
              />
              <Footer />
            </>) : (
              <Redirect to="/login" />
            )
          }
        </Route>
        {/* <Route path="/purchase">
          <Header fetchSearchProducts={props.fetchSearchProducts} logoutUser={props.logoutUser} auth={props.auth} totalProducts={props.cart.products.length} />
          <Purchase />
          <Footer />
        </Route> */}
        <Route path="/profile">
          {props.auth.isAuthenticated ? (
            <>
              <Header setCurrentSearched={props.setCurrentSearched} currentSearched={props.currentSearched} fetchSearchProducts={props.fetchSearchProducts} logoutUser={props.logoutUser} auth={props.auth} totalProducts={props.cart.products.length} />
              <UserContext.Provider value={{
                wishlistProducts: props.wishlist.products,
                removeFromWishlist: props.removeFromWishlist,
                orders: props.orders,
                user: props.user,
                fetchProfile: props.fetchProfile,
                updateProfile: props.updateProfile,
                fetchOrders: props.fetchOrders,
                orderLoaded: props.orderLoaded
              }}>
                <Profile />
              </UserContext.Provider>
              <Footer />
            </>
          ) : (
              <Redirect to='/home' />
            )
          }
        </Route>
        {/* <Route path="/videos">
          <Header fetchSearchProducts={props.fetchSearchProducts} logoutUser={props.logoutUser} auth={props.auth} totalProducts={props.cart.products.length} />
          <Videos />
          <Footer />
        </Route> */}
        <Route exact path="/login">
          <AuthContext.Provider value={{
            loginUser: props.loginUser,
            auth: props.auth,
            loginUserThirdParty: props.loginUserThirdParty
          }}>
            <LoginRegister type="login" />
          </AuthContext.Provider>
        </Route>
        <Route exact path="/register">
          <AuthContext.Provider value={{
            registerUser: props.registerUser,
            register: props.register,
            loginUser: props.loginUser,
            clearRegsiter: props.clearRegsiter,
            isAuthenticated: props.auth.isAuthenticated,
            loginUserThirdParty: props.loginUserThirdParty
          }}>
            <LoginRegister type="register" />
          </AuthContext.Provider>
        </Route>
        <Route path="/search">
          <Header setCurrentSearched={props.setCurrentSearched} currentSearched={props.currentSearched} fetchSearchProducts={props.fetchSearchProducts} searchProducts={props.searchProducts} logoutUser={props.logoutUser} auth={props.auth} totalProducts={props.cart.products.length} />
          <Search productsLoading={props.productsLoading} productsError={props.productsError} searchProducts={props.searchProducts} />
          <Footer />
        </Route>
        <PrivateRoute path="/order/:order_no" component={OrderInvoiceComponent} />

        <Redirect to='/home' />
      </Switch>
    </div>
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
