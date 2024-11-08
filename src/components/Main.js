import React,{ useEffect } from 'react';
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
import { UserContext, CartContext, AuthContext } from '../utils/context';

import { postProductToWishlist, addToCart, fetchProductDetails, removeFromCart, removeProductFromWishlist, updateDeliveryCost, updateQuantity, postOrder, addSingleProduct, removeSingleProduct, loginUser, logoutUser, registerUser, clearRegsiter, loginUserThirdParty, fetchHomeProducts, setCurrentSlug, fetchSearchProducts, deleteProductDetails, fetchSelectedOrder, fetchProfile, updateProfile, postQuestion, clearQuestionPosted, postReview, clearReviewPosted, fetchOrders, setCurrentSearched, filterProducts, sortProducts, fetchCategories, fetchCategoryProducts } from '../redux/actionCreators';
import OrderInvoice from './OrderInvoice';
import ScrollToTop from './ScrollToTop';
import PricacyPolicy from './PrivacyPolicy';

const mapDispatchToProps = (dispatch) => ({
  resetSignUpForm: () => dispatch(actions.reset('user')),
  fetchProductDetails: (productTitle) => dispatch(fetchProductDetails(productTitle)),
  addToCart: (product) => dispatch(addToCart(product)),
  removeFromCart: (productId) => dispatch(removeFromCart(productId)),
  updateQuantity: (productId, quantity) => dispatch(updateQuantity(productId, quantity)),
  updateDeliveryCost: (cost) => dispatch(updateDeliveryCost(cost)),
  addToWishlist: (product) => dispatch(postProductToWishlist(product)),
  removeFromWishlist: (productId) => dispatch(removeProductFromWishlist(productId)),
  postOrder: (order, fromBuy, history, authenticated) => dispatch(postOrder(order, fromBuy, history, authenticated)),
  addSingleProduct: (product) => dispatch(addSingleProduct(product)),
  removeSingleProduct: () => dispatch(removeSingleProduct()),
  loginUser: (creds, remember, history) => dispatch(loginUser(creds, remember, history)),
  logoutUser: (remember, history) => dispatch(logoutUser(remember, history)),
  registerUser: (user) => dispatch(registerUser(user)),
  clearRegsiter: () => dispatch(clearRegsiter()),
  loginUserThirdParty: (creds, provider, history) => dispatch(loginUserThirdParty(creds, provider, history)),
  fetchHomeProducts: (limit) => dispatch(fetchHomeProducts(limit)),
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
  filterProducts: (minPrice, maxPrice, rating) => dispatch(filterProducts(minPrice, maxPrice, rating)),
  sortProducts: (sortType) => dispatch(sortProducts(sortType)),
  fetchCategories: () => dispatch(fetchCategories()),
  fetchCategoryProducts: (categoryName) => dispatch(fetchCategoryProducts(categoryName)),
});

const mapStateToProps = (state) => {
  return {
    selectedProduct: state.products.selectedProduct,
    cart: state.cart,
    wishList: state.user.wishList,
    user: state.user,
    orders: state.order.orders,
    orderLoaded: state.order.orderLoaded,
    singleProduct: state.order.singleProduct,
    auth: state.auth,
    register: state.register,
    homeProducts: state.products.homeProducts,
    filteredProducts: state.products.filteredProducts,
    currentSlug: state.products.currentSlug,
    selectedOrder: state.order.selectedOrder,
    questionPosted: state.products.questionPosted,
    reviewPosted: state.order.reviewPosted,
    ordersLoading: state.order.isLoading,
    currentSearched: state.products.currentSearched,
    productsLoading: state.products.isLoading,
    productsError: state.products.errMess,
    categories: state.categories.categories,
    categoriesLoaded: state.categories.hasLoaded,
    districts: state.districts
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
          pathname: '/',
          state: { from: location }
        }} />
    )} />
  );

  useEffect(() => {
    if(props.auth.isAuthenticated) {
      if(!props.orderLoaded) {
        props.fetchOrders();
      }
      if(!props.user.hasLoaded) {
        props.fetchProfile();
      }
    }
  }, [])

  const ProductDetailsWithSlug = () => {
    // console.log('match: l' + JSON.stringify(match));
    // console.log('before state : ' + props.selectedProduct);
    // console.log('after state : ' + props.selectedProduct);
    const { slug } = useParams();
    return (
      <>
        <Header categories={props.categories} fetchCategories={props.fetchCategories} categoriesLoaded={props.categoriesLoaded} setCurrentSearched={props.setCurrentSearched} currentSearched={props.currentSearched} fetchSearchProducts={props.fetchSearchProducts} logoutUser={props.logoutUser} auth={props.auth} totalProducts={props.cart.products.length} />
        <CartContext.Provider value={{
          addToCart: props.addToCart,
          addSingleProduct: props.addSingleProduct,
          slug,
          currentSlug: props.currentSlug,
          setCurrentSlug: props.setCurrentSlug,
          fetchProductDetails: props.fetchProductDetails,
          productLoading: props.productsLoading,
          productError: props.productsError,
          deleteProductDetails: props.deleteProductDetails,
          postQuestion: props.postQuestion,
          questionPosted: props.questionPosted,
          clearQuestionPosted: props.clearQuestionPosted,
          isAuthenticated: props.auth.isAuthenticated,
          wishList: props.wishList
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
        <Header categories={props.categories} fetchCategories={props.fetchCategories} categoriesLoaded={props.categoriesLoaded} setCurrentSearched={props.setCurrentSearched} currentSearched={props.currentSearched} fetchSearchProducts={props.fetchSearchProducts} logoutUser={props.logoutUser} auth={props.auth} totalProducts={props.cart.products.length} />
        <OrderInvoice clearReviewPosted={props.clearReviewPosted} reviewPosted={props.reviewPosted} postReview={props.postReview} order_no={order_no} orders={props.orders} />
        <Footer />
      </React.Fragment>
    );
  };

  const CategoryProducts = () => {
    let { categoryName } = useParams();
    categoryName = categoryName.split('-').join(' ');

    return (
      <>
        <Header categories={props.categories} fetchCategories={props.fetchCategories} categoriesLoaded={props.categoriesLoaded} setCurrentSearched={props.setCurrentSearched} currentSearched={props.currentSearched} fetchSearchProducts={props.fetchSearchProducts} logoutUser={props.logoutUser} auth={props.auth} totalProducts={props.cart.products.length} />
        <Search fetchCategoryProducts={props.fetchCategoryProducts} categoryName={categoryName} sortProducts={props.sortProducts} filterProducts={props.filterProducts} productsLoading={props.productsLoading} productsError={props.productsError} filteredProducts={props.filteredProducts} />
        <Footer />
      </>
    )
  }

  return (
    <div className="main">
      <ScrollToTop />
      <Switch>
        <Route exact path="/">
          <Header categories={props.categories} fetchCategories={props.fetchCategories} categoriesLoaded={props.categoriesLoaded} setCurrentSearched={props.setCurrentSearched} currentSearched={props.currentSearched} fetchSearchProducts={props.fetchSearchProducts} logoutUser={props.logoutUser} auth={props.auth} totalProducts={props.cart.products.length} />
          <Home productsLoading={props.productsLoading} productsError={props.productsError} homeProducts={props.homeProducts} fetchHomeProducts={props.fetchHomeProducts} />
          <Footer />
        </Route>
        <Route path="/product/:slug" component={ProductDetailsWithSlug} />
        <Route path="/category/:categoryName" component={CategoryProducts} />
        <Route path="/cart" >
          <Header categories={props.categories} fetchCategories={props.fetchCategories} categoriesLoaded={props.categoriesLoaded} setCurrentSearched={props.setCurrentSearched} currentSearched={props.currentSearched} fetchSearchProducts={props.fetchSearchProducts} logoutUser={props.logoutUser} auth={props.auth} totalProducts={props.cart.products.length} />
          <CartContext.Provider value={{
            removeFromCart: props.removeFromCart,
            cartProducts: props.cart.products,
            updateQuantity: props.updateQuantity,
            deliverySelect: props.cart.deliverySelect,
            updateDeliveryCost: props.updateDeliveryCost,
            hasLoaded: props.districts.hasLoaded,
            districts: props.districts.districts,
            district: props.user.profileInformation.address.district
          }}>
            <Cart />
          </CartContext.Provider>
          <Footer />

        </Route>
        <Route path="/checkout">
          <Header categories={props.categories} fetchCategories={props.fetchCategories} categoriesLoaded={props.categoriesLoaded} setCurrentSearched={props.setCurrentSearched} currentSearched={props.currentSearched} fetchSearchProducts={props.fetchSearchProducts} logoutUser={props.logoutUser} auth={props.auth} totalProducts={props.cart.products.length} />
          <Checkout
            cartProducts={props.cart.products}
            deliverySelect={props.cart.deliverySelect}
            updateDeliveryCost={props.updateDeliveryCost}
            authenticated={props.auth.isAuthenticated}
            userInformation={props.user.profileInformation}
            postOrder={props.postOrder}
            singleProduct={props.singleProduct}
            removeSingleProduct={props.removeSingleProduct}
          />
          <Footer />
        </Route>
        {/* <Route path="/purchase">
          <Header fetchSearchProducts={props.fetchSearchProducts} logoutUser={props.logoutUser} auth={props.auth} totalProducts={props.cart.products.length} />
          <Purchase />
          <Footer />
        </Route> */}
        <Route path="/profile">
          {props.auth.isAuthenticated ? (
            <>
              <Header categories={props.categories} fetchCategories={props.fetchCategories} categoriesLoaded={props.categoriesLoaded} setCurrentSearched={props.setCurrentSearched} currentSearched={props.currentSearched} fetchSearchProducts={props.fetchSearchProducts} logoutUser={props.logoutUser} auth={props.auth} totalProducts={props.cart.products.length} />
              <UserContext.Provider value={{
                wishlistProducts: props.wishList,
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
              <Redirect to='/' />
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
          <Header categories={props.categories} fetchCategories={props.fetchCategories} categoriesLoaded={props.categoriesLoaded} setCurrentSearched={props.setCurrentSearched} currentSearched={props.currentSearched} fetchSearchProducts={props.fetchSearchProducts} logoutUser={props.logoutUser} auth={props.auth} totalProducts={props.cart.products.length} />
          <Search sortProducts={props.sortProducts} filterProducts={props.filterProducts} productsLoading={props.productsLoading} productsError={props.productsError} filteredProducts={props.filteredProducts} />
          <Footer />
        </Route>
        <Route path="/order/:order_no" component={OrderInvoiceComponent} />
        <Route path='/policy'>
          <Header categories={props.categories} fetchCategories={props.fetchCategories} categoriesLoaded={props.categoriesLoaded} setCurrentSearched={props.setCurrentSearched} currentSearched={props.currentSearched} fetchSearchProducts={props.fetchSearchProducts} logoutUser={props.logoutUser} auth={props.auth} totalProducts={props.cart.products.length} />
          <PricacyPolicy />
          <Footer />
        </Route>

        <Redirect to='/' />
      </Switch>
    </div>
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
