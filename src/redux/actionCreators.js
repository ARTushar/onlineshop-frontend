import * as ActionTypes from './ActionTypes';
import axios from 'axios';
import { baseUrl } from '../shared/baseUrl';
import jwt_decode from 'jwt-decode';


export const isTokenExpired = (tokenName) => {
  const token = localStorage.getItem(tokenName);
  const decoded = jwt_decode(token);

  const hasExpired = Date.now() >= (decoded.exp - 60 ) * 1000;
  return hasExpired;
}

const handleTokenExpiration = async () => {
  console.log('handling token expiration');
  if(isTokenExpired('token') && !isTokenExpired('refreshToken')){
    await getNewToken(3);
  }
}

const getNewToken = (counter) => {
  console.log('getting new token : ' + counter);
  if(!counter) return;
  const bearer = 'Bearer ' + localStorage.getItem('refreshToken');

  return axios({
    method: 'GET',
    url: 'users/token/refresh',
    baseURL: baseUrl,
    headers: {
      'Authorization': bearer
    }
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
      if (response.success){
        console.log('successfully refreshed the token');
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
      }
    })
    .catch(error => {
      if(error.response) console.log(error.response.data);
      else console.log(error.message);
      getNewToken(counter-1);
    })
}

const calculateAvgRating = (reviews) => {
  if(!reviews) return 0;
  let avg_rating = 0;
  reviews.map((rev) => {
    avg_rating += rev.rating;
  });
  if (reviews.length > 0) {
    avg_rating = avg_rating / reviews.length;
  }
  return avg_rating;
};

/**
 * products 
 */
export const setCurrentSlug = (currentSlug) => ({
  type: ActionTypes.SET_CURRENT_SLUG,
  currentSlug
})

export const setCurrentSearched = (currentSearched) => ({
  type: ActionTypes.SET_CURRENT_SEARCHED,
  currentSearched
})

export const filterProducts = (minPrice, maxPrice, rating) => ({
  type: ActionTypes.FILTER_SEARCH_PRODUCTS,
  minPrice,
  maxPrice,
  rating
})

export const sortProducts = (sortType) => ({
  type: ActionTypes.SORT_SEARCH_PRODUCTS,
  sortType
})

export const fetchProductRequest = () => ({
  type: ActionTypes.FETCH_REQUEST
})

export const fetchProductDone = () => ({
  type: ActionTypes.FETCH_SUCCESS
})

export const fetchProductFailure = () => ({
  type: ActionTypes.FETCH_FAILURE
})

export const addHomeProducts = (products) => ({
  type: ActionTypes.ADD_HOME_PRODUCTS,
  payload: products
})

const addProductDetails = (selected_product) => ({
  type: ActionTypes.ADD_PRODUCT_DETAILS,
  selectedProduct: selected_product,
});

export const deleteProductDetails = () => ({
  type: ActionTypes.DELETE_PRODUCT_DETAILS
});

export const addSearchProducts = (products) => ({
  type: ActionTypes.ADD_SEARCH_PRODUCTS,
  payload: products
})

export const fetchError = (errMess) => ({
  type: ActionTypes.FETCH_FAILURE,
  errMess
})

export const fetchSuccess = () => ({
  type: ActionTypes.FETCH_SUCCESS
})

export const fetchProductDetails = (slug) => (dispatch) => {
  dispatch(fetchProductRequest());

  return axios({
    method: 'GET',
    url: 'products/product/' + slug,
    baseURL: baseUrl
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
      response.price = response.price / 100;
      response.rating = calculateAvgRating(response.reviews);
      dispatch(addProductDetails(response));
      dispatch(fetchSuccess());
    })
    .catch(error => {
      if(error.response) dispatch(fetchError(error.response.data))
      else dispatch(fetchError(error.message));
    })
}

export const fetchHomeProducts = () => (dispatch) => {
  console.log("fetching ");
  dispatch(fetchProductRequest());

  return axios({
    method: 'GET',
    url: 'products/home',
    baseURL: baseUrl
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
      Object.entries(response).map(categoryProduct =>{
        categoryProduct[1].map(product => {
          product.price /= 100;
          product.averageRating = calculateAvgRating(product.reviews);
        })
      })
      dispatch(addHomeProducts(response));
      dispatch(fetchSuccess());
    })
    .catch(error => {
      if(error.response) dispatch(fetchError(error.response.data))
      else dispatch(fetchError(error.message));
    })
}

export const fetchSearchProducts = (searchInput) => (dispatch) => {
  console.log("fetching : " + JSON.stringify(searchInput));
  dispatch(fetchProductRequest());

  return axios({
    method: 'GET',
    url: 'products/search',
    baseURL: baseUrl,
    params: {
      input: searchInput
    }
  })
    .then(response => {
      console.log(response);
      if (response && response.status === 200 && response.statusText === 'OK') {
        return response.data;
      } else {
        let error = new Error('Error ' + response.status + ": " + response.statusText);
        error.response = response;
        setCurrentSearched(null);
        throw error;
      }
    }, error => {
      throw error;
    })
    .then(response => {
      for (let i = 0; i < response.length; i++) {
        response[i].price = response[i].price / 100;
        response[i].averageRating = calculateAvgRating(response[i].reviews);
      }
      dispatch(addSearchProducts(response));
      dispatch(fetchSuccess());
    })
    .catch(error => {
      if(error.response) dispatch(fetchError(error.response.data))
      else dispatch(fetchError(error.message));
    })
}

/**
 * Question Answers 
 */

const setQuestionPosted = () => ({
  type: ActionTypes.SET_QUESTION_POSTED
})

export const clearQuestionPosted = () => ({
  type: ActionTypes.CLEAR_QUESTION_POSTED
})

export const postQuestion = (question, productId) => dispatch => {

  handleTokenExpiration();
  const bearer = 'Bearer ' + localStorage.getItem('token');

  axios({
    method: 'POST',
    url: 'products/' + productId + "/questions",
    baseURL: baseUrl,
    data: question,
    headers: {
      'Authorization': bearer
    }
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
      if (response.status)
        dispatch(setQuestionPosted())
    })
    .catch(error => {
      if(error.response) console.log(error.response.data);
      else console.log(error.message);
    })
}


/**
 * cart 
 */

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

/**
 * wishlist 
 */


const addToWishlist = (product) => ({
  type: ActionTypes.ADD_TO_WISHLIST,
  payload: product
});


const removeFromWishlist = (productId) => ({
  type: ActionTypes.REMOVE_FROM_WISHLIST,
  payload: productId
});


export const postProductToWishlist = (product) => (dispatch) => {

  handleTokenExpiration();
  const bearer = 'Bearer ' + localStorage.getItem('token');

  axios({
    method: 'POST',
    url: 'users/wishlist/' + product.id,
    baseURL: baseUrl,
    headers: {
      'Authorization': bearer
    }
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
        dispatch(addToWishlist(product));
      }
    })
    .catch(error => {
      if(error.response) console.log(error.response.data)
      else console.log(error.message);
    })
}

export const removeProductFromWishlist = (productId) => (dispatch) => {

  handleTokenExpiration();
  const bearer = 'Bearer ' + localStorage.getItem('token');

  axios({
    method: 'DELETE',
    url: 'users/wishlist/' + productId,
    baseURL: baseUrl,
    headers: {
      'Authorization': bearer
    }
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
        dispatch(removeFromWishlist(productId));
      }
    })
    .catch(error => {
      if(error.response) console.log(error.response.data)
      else console.log(error.message);
    })
}

/**
 * orders
 */

const removeOrders = () => ({
  type: ActionTypes.REMOVE_ORDERS
})

export const addOrder = (order) => ({
  type: ActionTypes.ADD_ORDER,
  payload: order
})

export const addSelectedOrder = (order) => ({
  type: ActionTypes.ADD_SELECTED_ORDER,
  payload: order
})

export const addAllOrders = (orders) => ({
  type: ActionTypes.ADD_ALL_ORDERS,
  payload: orders
})

const requestOrders = () => ({
  type: ActionTypes.FETCH_ORDERS_REQUEST
})

const orderSuccess = () => ({
  type: ActionTypes.FETCH_ORDERS_SUCCESS
})

const orderFailure = (errMess) => ({
  type: ActionTypes.FETCH_ORDERS_FAILURE,
  errMess
});


export const fetchSelectedOrder = (orders, orderId) => (dispatch) => {
  dispatch(addSelectedOrder(orders.filter(order => order._id == orderId)[0]));
}

export const fetchOrders = () => (dispatch) => {
  dispatch(requestOrders())

  handleTokenExpiration();
  const bearer = 'Bearer ' + localStorage.getItem('token');

  return axios({
    method: 'GET',
    url: 'orders/user',
    baseURL: baseUrl,
    headers: {
      'Authorization': bearer
    }
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
      dispatch(addAllOrders(response));
      dispatch(orderSuccess());
    })
    .catch(error => {
      if(error.response) dispatch(orderFailure(error.response.data))
      dispatch(orderFailure(error.message));
    })
}

export const postOrder = (order, fromBuy) => (dispatch) => {
  console.log('Posting an order')

  dispatch(requestOrders())

  handleTokenExpiration();
  const bearer = 'Bearer ' + localStorage.getItem('token');

  axios({
    method: 'POST',
    url: 'orders/user',
    baseURL: baseUrl,
    data: order,
    headers: {
      'Authorization': bearer
    }
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
      dispatch(addOrder(response));
      dispatch(orderSuccess());
    })
    .catch(error => {
      if(error.response) dispatch(orderFailure(error.response.data))
      else dispatch(orderFailure(error.message));
    })

  if (!fromBuy)
    dispatch(deleteCart());
}

export const addSingleProduct = (product) => ({
  type: ActionTypes.ADD_SINGLE_PRODUCT,
  payload: product
})

export const removeSingleProduct = () => ({
  type: ActionTypes.REMOVE_SINGLE_PRODUCT
})

const updateOrderAfterReview = (orderId, productId) => ({
  type: ActionTypes.UPDATE_GIVEN_REVIEW,
  orderId,
  productId
});


/**
 * reviews 
 */

const setReviewPosted = () => ({
  type: ActionTypes.SET_REVIEW_POSTED
})

export const clearReviewPosted = () => ({
  type: ActionTypes.CLEAR_REVIEW_POSTED
})

export const postReview = (review, productId) => dispatch => {

  handleTokenExpiration();
  const bearer = 'Bearer ' + localStorage.getItem('token');
  const orderId = review.orderId;

  axios({
    method: 'POST',
    url: 'products/' + productId + "/reviews",
    baseURL: baseUrl,
    data: review,
    headers: {
      'Authorization': bearer
    }
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
      if (response.status) {
        dispatch(setReviewPosted());
        // dispatch(updateOrderAfterReview(orderId, productId));
      }
    })
    .catch(error => {
      if(error.response) console.log(error.response.data)
      else console.log(error.message);
    })
}


/**
 * user information
 */

const removeProfile = () => ({
  type: ActionTypes.REMOVE_PROFILE
})

const addProfile = (profile, wishList) => ({
  type: ActionTypes.ADD_PROFILE,
  profileInformation: profile,
  wishList
})

const requestProfile = () => ({
  type: ActionTypes.FETCH_PROFILE_REQUEST
})

const fetchProfileSuccess = () => ({
  type: ActionTypes.FETCH_PROFILE_SUCCESS
})

const fetchProfileFailure = (errMess) => ({
  type: ActionTypes.FETCH_PROFILE_FAILURE,
  errMess
})

const setLoad = () => ({
  type: ActionTypes.SET_LOAD
})

export const fetchProfile = () => (dispatch) => {
  dispatch(requestProfile())

  handleTokenExpiration();
  const bearer = 'Bearer ' + localStorage.getItem('token');

  return axios({
    method: 'GET',
    url: 'users',
    baseURL: baseUrl,
    headers: {
      'Authorization': bearer
    }
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
      const wishList = response.wishList;
      for(const product of wishList){
        product.price /= 100;
        product.rating = calculateAvgRating(product.reviews)
      }
      delete response.wishList;
      dispatch(addProfile(response, wishList))
      dispatch(fetchProfileSuccess());
      dispatch(setLoad());
    })
    .catch(error => {
      if(error.response) dispatch(fetchProfileFailure(error.response.data))
      else dispatch(fetchProfileFailure(error.message));
    })
}

export const updateProfile = (profile) => (dispatch) => {
  dispatch(requestProfile())

  handleTokenExpiration();
  const bearer = 'Bearer ' + localStorage.getItem('token');

  return axios({
    method: 'PUT',
    url: 'users/update',
    baseURL: baseUrl,
    data: profile,
    headers: {
      'Authorization': bearer
    }
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
      dispatch(addProfile(response))
      dispatch(fetchProfileSuccess());

    })
    .catch(error => {
      if(error.response) dispatch(fetchProfileFailure(error.response.data))
      dispatch(fetchProfileFailure(error.message));
    })
}


// authentication

export const requestLogin = (creds) => ({
  type: ActionTypes.LOGIN_REQUEST,
  creds
});

export const receiveLogin = (response) => ({
  type: ActionTypes.LOGIN_SUCCESS,
  token: response.token,
  refreshToken: response.refreshToken
});

export const loginError = (message) => ({
  type: ActionTypes.LOGIN_FAILURE,
  message
})

export const loginUser = (creds, remember, history) => (dispatch) => {
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
        localStorage.setItem('refreshToken', response.refreshToken);
        if (remember) {
          creds.remember = remember;
          localStorage.setItem('creds', JSON.stringify(creds));
        } else {
          localStorage.removeItem('creds');
        }
        dispatch(receiveLogin(response));
        history.push('/home');
      } else {
        let error = new Error('Error ' + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch(error => {
      if (error.response)
        dispatch(loginError(error.response.data.err));
      else dispatch(loginError(error.message));
    })
};

export const requestLoginThirdParty = () => ({
  type: ActionTypes.LOGIN_REQUEST
})

export const loginUserThirdParty = (creds, provider, history) => (dispatch) => {
  dispatch(requestLoginThirdParty());
  console.log(creds);
  return axios({
    method: 'POST',
    url: 'users/' + provider + "/token",
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
        localStorage.setItem('refreshToken', response.refreshToken);
        dispatch(receiveLogin(response));
        if (history.location.state) {
          console.log('location: ' + JSON.stringify(history.location.state.productLocation));
          history.push(history.location.state.productLocation)
        } else
          history.push('/home')
      } else {
        let error = new Error('Error ' + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch(error => {
      if (error.response)
        dispatch(loginError(error.response.data.err));
      else dispatch(loginError(error.message));
    })
}

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
export const logoutUser = (remember, history) => (dispatch) => {
  dispatch(requestLogout());
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  if (remember)
    dispatch(receiveLogoutRemember());
  else dispatch(receiveLogout());
  history.push('/home');
  dispatch(removeOrders());
  dispatch(removeProfile());
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
    .catch(error => {
      if (error.response)
        dispatch(registerError(error.response.data.err))
      else dispatch(registerError(error.message));
    })

};

export const clearRegsiter = () => ({
  type: ActionTypes.REGISTER_CLEAR
});


/**
 * categories
 */


const addCategories = (categories) => ({
  type: ActionTypes.ADD_CATEGORIES,
  payload: categories
})

const requestCategories = () => ({
  type: ActionTypes.FETCH_CATEGORIES_REQUEST
})

const fetchCategoriesSuccess = () => ({
  type: ActionTypes.FETCH_CATEGORIES_SUCCESS
})

const fetchCategoriesFailure = (errMess) => ({
  type: ActionTypes.FETCH_CATEGORIES_FAILURE,
  errMess
})

const setCategoriesLoaded= () => ({
  type: ActionTypes.SET_CATEGORY_LOADED
})

export const fetchCategories = () => (dispatch) => {
  dispatch(requestCategories());

  return axios({
    method: 'GET',
    url: 'categories',
    baseURL: baseUrl,
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
      dispatch(addCategories(response))
      dispatch(fetchCategoriesSuccess());
      dispatch(setCategoriesLoaded());
    })
    .catch(error => {
      if(error.response) dispatch(fetchCategoriesFailure(error.response.data))
      else dispatch(fetchCategoriesFailure(error.message));
    })
}


/**
 * 
 */