import * as ActionTypes from './ActionTypes';

import { PRODUCTS_DETAILS } from '../shared/productDetails';


export const fetchProductDetails = (slug) => (dispatch) => {
  const selected_product = PRODUCTS_DETAILS.filter((product) => product.slug === slug)[0];
  dispatch(addProductDetails(selected_product));
}


const addProductDetails = (selected_product) => ({
	type: ActionTypes.ADD_PRODUCT_DETAILS,
	selectedProduct: selected_product,
});


export const addToCart = (product) => ({
  type: ActionTypes.ADD_TO_CART,
  payload: product
});


export const removeFromCart = (productId) => ({
  type: ActionTypes.REMOVE_FROM_CART,
  payload: productId
});

export const updateQuantity = (productId, quantity) => ({
  type: ActionTypes.UPDATE_QUANTITY,
  payload: {
    productId,
    quantity
  }
});

export const updateDeliveryCost = (cost) => ({
  type: ActionTypes.UPDATE_DELIVERY_COST,
  payload: cost
});

export const deleteCart = () => ({
  type: ActionTypes.INITIALIZE_CART
})

// export const addInWishlist = (product) => (dispatch) => {
//   dispatch(add(product));
// };

// const add = (product) => ({
//   type: ActionTypes.ADD_IN_WISHLIST,
//   payload: product,
// });


export const addToWishlist = (product) => ({
  type: ActionTypes.ADD_TO_WISHLIST,
  payload: product
});


export const removeFromWishlist = (productId) => ({
  type: ActionTypes.REMOVE_FROM_WISHLIST,
  payload: productId
});

// orders
export const addOrder = (order) => ({
  type: ActionTypes.ADD_ORDER,
  payload: order
})

export const postOrder = (order) => (dispatch) => {
  console.log('Posting an order')
  dispatch(addOrder(order));
  dispatch(deleteCart());
}
