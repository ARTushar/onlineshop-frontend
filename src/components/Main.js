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

import AdminHome from './AdminHome';
import AdminOrders from './AdminOrders';
import AdminProducts from './AdminProducts';
import AdminAddProduct from './AdminAddProduct';
import AdminCustomers from './AdminCustomers';
import AdminCategories from './AdminCategories';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';

import { actions } from 'react-redux-form';
import { UserContext, CartContext } from '../Context/context';

import { addToCart, fetchProductDetails, removeFromCart, updateDeliveryCost, updateQuantity } from '../redux/actionCreators';

const mapDispatchToProps = (dispatch) => ({
	resetSignUpForm: () => dispatch(actions.reset('user')),
	fetchProductDetails: (productTitle) => dispatch(fetchProductDetails(productTitle)),
	addToCart: (product) => dispatch(addToCart(product)),
	removeFromCart: (productId) => dispatch(removeFromCart(productId)),
	updateQuantity: (productId, quantity) => dispatch(updateQuantity(productId, quantity)),
	updateDeliveryCost: (cost) => dispatch(updateDeliveryCost(cost)),
});

const mapStateToProps = (state) => {
	return {
		products: state.products.products,
		selectedProduct: state.products.selectedProduct,
		cart: state.cart,
	};
};

function Main(props) {
    const location = useLocation();
		console.log(location.pathname);

		const ProductDetailsWithSlug = ({match}) => {
			console.log('match: l' + JSON.stringify(match));
			console.log('before state : ' + props.selectedProduct);
		props.fetchProductDetails(match.params.slug);
		console.log('after state : ' + props.selectedProduct);
		return (
			<React.Fragment>
				<Header totalProducts={props.cart.products.length}/>
				<CartContext.Provider value={
					props.addToCart
				}>
					<ProductDetails selectedProduct={props.selectedProduct} />
				</CartContext.Provider>
				<Footer />
			</React.Fragment>
		);
	}

	return (
		<div className="main">
			<Switch>
				<Route path="/home">
					<Header totalProducts={props.cart.products.length} />
					<Home />
					<Footer />
				</Route>
				<Route path="/product/:slug" component={ProductDetailsWithSlug} />
				<Route path="/cart" >
					<Header totalProducts={props.cart.products.length} />
					<CartContext.Provider value={{
						removeFromCart: props.removeFromCart,
						cartProducts: props.cart.products,
						updateQuantity: props.updateQuantity,
						updateDeliveryCost: props.updateDeliveryCost,
						deliveryCost: props.cart.deliveryCost,
						updateDeliveryCost: props.updateDeliveryCost
					}}>
						<Cart />
					</CartContext.Provider>
					<Footer />

				</Route>
				<Route path="/checkout">
					<Header totalProducts={props.cart.products.length} />
					<Checkout />
					<Footer />
				</Route>
				<Route path="/purchase">
					<Header totalProducts={props.cart.products.length} />
					<Purchase />
					<Footer />
				</Route>
				<Route path="/profile">
					<Header totalProducts={props.cart.products.length} />
					<Profile />
					<Footer />
				</Route>
				<Route path="/videos">
					<Header totalProducts={props.cart.products.length} />
					<Videos />
					<Footer />
				</Route>
				<Route exact path="/login">
					<LoginRegister type="login" />
				</Route>
				<Route exact path="/register">
					<UserContext.Provider value={props.resetSignUpForm}>
						<LoginRegister type="register" />
					</UserContext.Provider>
				</Route>
				<Route path="/search">
					<Header totalProducts={props.cart.products.length} />
					<Search />
					<Footer />
				</Route>
				<Route exact path='/admin'>
					<AdminHeader />
					<AdminHome />
					<AdminFooter />
				</Route>
				<Route exact path='/admin/home'>
					<AdminHeader />
					<AdminHome />
					<AdminFooter />
				</Route>
				<Route exact path='/admin/orders'>
					<AdminHeader />
					<AdminOrders />
					<AdminFooter />
				</Route>
				<Route exact path='/admin/products'>
					<AdminHeader />
					<AdminProducts />
					<AdminFooter />
				</Route>
				<Route exact path='/admin/addproduct'>
					<AdminHeader />
					<AdminAddProduct />
					<AdminFooter />
				</Route>
				<Route exact path='/admin/customers'>
					<AdminHeader />
					<AdminCustomers />
					<AdminFooter />
				</Route>
				<Route exact path='/admin/categories'>
					<AdminHeader />
					<AdminCategories />
					<AdminFooter />
				</Route>
				<Redirect to='/home' />
			</Switch>
		</div>
	);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
