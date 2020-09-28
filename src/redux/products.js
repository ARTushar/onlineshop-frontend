import * as ActionTypes from './ActionTypes';


export const Products = (
  state = {selectedProduct: null, products: []}, 
  action
  ) => {
    switch(action.type) {
      case ActionTypes.ADD_PRODUCT_DETAILS:
        return { ...state, selectedProduct: action.selectedProduct };
      default:
        return state;
    }
} 
