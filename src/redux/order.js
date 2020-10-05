import * as ActionTypes from './ActionTypes';


const Order = (state = {
    orders: [],
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_ORDER:
            action.payload.date = new Date().toISOString();
            action.payload.serialNo = state.orders.length + 1; 
            return {...state, orders: state.orders.concat(action.payload)};
        
        default:
            return state;
    }
}

export default Order;