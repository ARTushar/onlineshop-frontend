import * as ActionTypes from './ActionTypes';


export const Products = (
  state = {
    isLoading: false,
    selectedProduct: null,
    homeProducts: [],
    searchProducts: [],
    errMess: null,
    currentSlug: ''
  }, 
  action
) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_SLUG:
      return {...state, currentSlug: action.currentSlug}

    case ActionTypes.ADD_PRODUCT_DETAILS:
      return { ...state, selectedProduct: action.selectedProduct };
    
    case ActionTypes.DELETE_PRODUCT_DETAILS:
      return {...state, selectedProduct: null};

    case ActionTypes.ADD_HOME_PRODUCTS:
      return { ...state, homeProducts: action.payload }

    case ActionTypes.ADD_SEARCH_PRODUCTS:
      return { ...state, searchProducts: action.payload }

    case ActionTypes.FETCH_REQUEST:
      return { ...state, isLoading: true }

    case ActionTypes.FETCH_FAILURE:
      return { ...state, isLoading: false, errMess: action.errMess }

    case ActionTypes.FETCH_SUCCESS:
      return { ...state, isLoading: false, errMess: null }

    default:
      return state;
  }
} 
