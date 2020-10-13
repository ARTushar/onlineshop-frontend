import * as ActionTypes from './ActionTypes';


const Order = (state = {
    orders: [],
    singleProduct: null,
    isLoading: false,
    errMess: null,
    selectedOrder: null
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_SELECTED_ORDER:
            return {...state, selectedOrder: action.payload }
        case ActionTypes.ADD_ORDER:
            return {...state, orders: state.orders.concat(action.payload)};
        
        case ActionTypes.ADD_ALL_ORDERS:
            return {...state, orders: action.payload}
        
        case ActionTypes.FETCH_ORDERS_REQUEST:
            return {...state, isLoading: true}
        
        case ActionTypes.FETCH_ORDERS_SUCCESS:
            return {...state, isLoading: false, errMess: null}
        
        case ActionTypes.FETCH_ORDERS_FAILURE:
            return {...state, isLoading: false, errMess: action.errMess}
        
        case ActionTypes.ADD_SINGLE_PRODUCT:
            return { ...state, singleProduct: action.payload}
        
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
        default:
            return state;
    }
}

export default Order;