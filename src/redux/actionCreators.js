import * as ActionTypes from './ActionTypes';
import axios from 'axios';
import { baseUrl } from '../shared/baseUrl';
import { PRODUCTS_DETAILS } from '../shared/productDetails';
import { saveToLocalStorage } from './localStorage';


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

export const postOrder = (order, fromBuy) => (dispatch) => {
  console.log('Posting an order')
  dispatch(addOrder(order));
  if(!fromBuy)
    dispatch(deleteCart());
}

export const addSingleProduct = (product) => ({
  type: ActionTypes.ADD_SINGLE_PRODUCT,
  payload: product
})

export const removeSingleProduct = () => ({
  type: ActionTypes.REMOVE_SINGLE_PRODUCT
})


// authentication

export const requestLogin = (creds) => ({
  type: ActionTypes.LOGIN_REQUEST,
  creds
});

export const receiveLogin = (response) => ({
  type: ActionTypes.LOGIN_SUCCESS,
  token: response.token
});

export const loginError = (message) => ({
  type: ActionTypes.LOGIN_FAILURE,
  message
})

export const loginUser = (creds, remember) => (dispatch) => {
  dispatch(requestLogin(creds));
  
  return axios({
    method: 'POST',
    url: 'users/login',
    baseURL: baseUrl,
    data: creds
  })
    .then(response => {
      console.log(response);
      if (response && response.status === 200 && response.statusText === 'OK') {
        return response.data;
      } else {
        let error = new Error('Error ' + response.status + ": " + response.statusText);
        error.response = response;
        throw error;
      }
    }, error => {
      throw error;
  })
    .then(response => {
      if (response.success) {
        localStorage.setItem('token', response.token);
        if (remember) {
          creds.remember = remember;
          localStorage.setItem('creds', JSON.stringify(creds));
        } else {
          localStorage.removeItem('creds');
        }
        dispatch(receiveLogin(response));
      } else {
        let error = new Error('Error ' + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch(error => dispatch(loginError(error.response.data.err)))
};

export const requestLogout = () => ({
  type: ActionTypes.LOGOUT_REQUEST
});

export const receiveLogout = () => ({
  type: ActionTypes.LOGOUT_SUCCESS
});

export const receiveLogoutRemember = () => ({
  type: ActionTypes.LOGOUT_SUCCESS_REMEMBER
});

// Logs the user out
export const logoutUser = (remember) => (dispatch) => {
  dispatch(requestLogout());
  localStorage.removeItem('token');
  if(remember)
    dispatch(receiveLogoutRemember());
  else dispatch(receiveLogout());
}

// register

export const requestRegister = () => ({
  type: ActionTypes.REGISTER_REQUEST
});

export const receiveRegister = () => ({
  type: ActionTypes.REGISTER_SUCCESS
});

export const registerError = (message) => ({
  type: ActionTypes.REGISTER_FAILURE,
  message
})

export const registerUser = (user) => (dispatch) => {
  dispatch(requestRegister());

  return axios({
    method: 'POST',
    url: 'users/register',
    baseURL: baseUrl,
    data: user
  })
    .then(response => {
      console.log(response);
      if (response && response.status === 200 && response.statusText === 'OK') {
        return response.data;
      } else {
        let error = new Error('Error ' + response.status + ": " + response.statusText);
        error.response = response;
        throw error;
      }
    }, error => {
      throw error;
  })
    .then(response => {
      if (response.success) {
        dispatch(receiveRegister());
      } else {
        let error = new Error('Error ' + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch(error => dispatch(registerError(error.response.data.err)))

};

export const clearRegsiter = () => ({
  type: ActionTypes.REGISTER_CLEAR
});