import * as ActionTypes from './ActionTypes';


const Order = (state = {
    orders: [],
    singleProduct: null,
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_ORDER:
            action.payload.date = new Date().toISOString();
            action.payload.serialNo = state.orders.length + 1; 
            action.payload.status = 'On Progress';
            return {...state, orders: state.orders.concat(action.payload)};
        
        case ActionTypes.ADD_SINGLE_PRODUCT:
            return { ...state, singleProduct: action.payload}
        
        case ActionTypes.REMOVE_SINGLE_PRODUCT:
            return { ...state, singleProduct: null }
        default:
            return state;
    }
}

export default Order;