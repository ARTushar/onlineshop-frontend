import { actionTypes } from 'react-redux-form';
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
    
    case ActionTypes.FILTER_SEARCH_PRODUCTS:
      let min, max;
      if(action.minPrice === '') min = 0;
      else min = parseInt(action.minPrice);
      if(action.maxPrice === '') max = Infinity;
      else max = parseInt(action.maxPrice);

      return {
        ...state, filteredProducts: state.searchProducts.filter((product) =>{ 
          const discountedPrice = product.price - product.price * product.discount * 0.01;
          console.log(discountedPrice, product.averageRating);
          return discountedPrice >= min && discountedPrice <= max 
          && product.averageRating >= action.rating
        })
      }
    
    case ActionTypes.SORT_SEARCH_PRODUCTS:
      let sortedProducts = [...state.filteredProducts]
      if (action.sortType === 'priceLow') {
        sortedProducts.sort((a, b) => {
          return (a.price - a.price * a.discount * 0.01) - (b.price - b.price * b.discount * 0.01)
        })
      } else if (action.sortType === 'priceHigh') {
        sortedProducts.sort((a, b) => {
          return -((a.price - a.price * a.discount * 0.01) - (b.price - b.price * b.discount * 0.01))
        })
      } else {
        sortedProducts.sort((a, b) => {
          return b.score - a.score;
        })
      }
      return {...state, filteredProducts: sortedProducts}

    default:
      return state;
  }
} 
