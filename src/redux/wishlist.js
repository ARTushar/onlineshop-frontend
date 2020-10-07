import * as ActionTypes from './ActionTypes';


const Wishlist = (state = {
    products: [],
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_TO_WISHLIST:
            // console.log("payload: " + JSON.stringify(action.payload))
            if (state.products.filter((product) => product.id === action.payload.id).length === 0)
                return { ...state, products: state.products.concat(action.payload) }
            return state;
        
        case ActionTypes.REMOVE_FROM_WISHLIST:
            return { ...state, products: state.products.filter((product) => product.id !== action.payload) }
        
        default:
            return state;
    }
}

export default Wishlist;