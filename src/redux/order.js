import * as ActionTypes from './ActionTypes';


const Order = (state = {
  orders: [],
  singleProduct: null,
  isLoading: false,
  orderLoaded: false,
  errMess: null,
  selectedOrder: null,
  reviewPosted: false
}, action) => {
  switch (action.type) {
    case ActionTypes.SET_REVIEW_POSTED:
      return { ...state, reviewPosted: true }

    case ActionTypes.CLEAR_REVIEW_POSTED:
      return { ...state, reviewPosted: false }

    case ActionTypes.ADD_SELECTED_ORDER:
      return { ...state, selectedOrder: action.payload }

    case ActionTypes.ADD_ORDER:
      return { ...state, orders: state.orders.concat(action.payload) };

    case ActionTypes.ADD_ALL_ORDERS:
      return { ...state, orders: action.payload }

    case ActionTypes.FETCH_ORDERS_REQUEST:
      return { ...state, isLoading: true }

    case ActionTypes.FETCH_ORDERS_SUCCESS:
      return { ...state, isLoading: false, errMess: null, orderLoaded: true }

    case ActionTypes.FETCH_ORDERS_FAILURE:
      return { ...state, isLoading: false, errMess: action.errMess }

    case ActionTypes.ADD_SINGLE_PRODUCT:
      return { ...state, singleProduct: action.payload }

    case ActionTypes.REMOVE_SINGLE_PRODUCT:
      return { ...state, singleProduct: null }

    case ActionTypes.REMOVE_ORDERS:
      return {
        orders: [],
        singleProduct: null,
        isLoading: false,
        errMess: null,
        selectedOrder: null
      }

    case ActionTypes.UPDATE_GIVEN_REVIEW:
      let order = state.orders.filter(order => order._id === action.orderId)[0];
      for(let i = 0; i < order.products.length; i++){
        if(order.products[i].product._id === action.productId){
          order.products[i].givenReview = true;
          break;
        }
      }
      let newOrders = state.orders.filter(order => order._id !== action.orderId);
      newOrders.concat(order);
      return {...state, orders: newOrders}

    default:
      return state;
  }
}

export default Order;