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
