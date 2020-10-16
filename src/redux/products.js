import * as ActionTypes from './ActionTypes';


export const Products = (
  state = {
    isLoading: false,
    selectedProduct: null,
    homeProducts: [],
    searchProducts: [],
    errMess: null,
    currentSlug: '',
    questionPosted: false,
    currentSearched: '',
    filteredProducts: []
  }, 
  action
) => {
  switch (action.type) {
    case ActionTypes.SET_QUESTION_POSTED:
      return {...state, questionPosted: true }
    
    case ActionTypes.CLEAR_QUESTION_POSTED:
        return {...state, questionPosted: false}

    case ActionTypes.SET_CURRENT_SLUG:
      return {...state, currentSlug: action.currentSlug}
    
    case ActionTypes.SET_CURRENT_SEARCHED:
      return {...state, currentSearched: action.currentSearched}

    case ActionTypes.ADD_PRODUCT_DETAILS:
      return { ...state, selectedProduct: action.selectedProduct };
    
    case ActionTypes.DELETE_PRODUCT_DETAILS:
      return {...state, selectedProduct: null};

    case ActionTypes.ADD_HOME_PRODUCTS:
      return { ...state, homeProducts: action.payload }

    case ActionTypes.ADD_SEARCH_PRODUCTS:
      return { ...state, searchProducts: action.payload, filteredProducts: action.payload }

    case ActionTypes.FETCH_REQUEST:
      return { ...state, isLoading: true }

    case ActionTypes.FETCH_FAILURE:
      return { ...state, isLoading: false, errMess: action.errMess }

    case ActionTypes.FETCH_SUCCESS:
      return { ...state, isLoading: false, errMess: null }
    
    // case ActionTypes.FILTER_SEARCH_PRODUCTS:
    //   return {
    //     ...state, filteredProducts: state.filteredProducts.filter((product) => {
    //       product.price >= action.minPrice && product.price <= action.maxPrice
    //       && (product.)
    //     })
    //   }

    default:
      return state;
  }
} 
