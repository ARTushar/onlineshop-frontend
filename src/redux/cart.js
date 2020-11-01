import * as ActionTypes from './ActionTypes';

export const selectSubTotalPrice = (products) => {
    return products?.reduce((amount, product) => amount + product.price * product.quantity, 0)
}

export const selectTotalPrice = (products, deliveryCost) => {
    let subTotal = products?.reduce((amount, product) => amount + product.price * product.quantity, 0)
    return subTotal + deliveryCost;
}

const defaultDeliverySelect = {
    label: "Dhaka (ঢাকা)",
    value: 'Dhaka',
    deliveryCost: 60
}

const Cart = (state = {
    products: [],
    deliverySelect: defaultDeliverySelect 
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            if (state.products.filter((product) => product.id === action.payload.id).length === 0)
                return { ...state, products: state.products.concat(action.payload) }
            return state;

        case ActionTypes.REMOVE_FROM_CART:
            return { ...state, products: state.products.filter((product) => product.id !== action.payload) }

        case ActionTypes.UPDATE_QUANTITY:
            let updatedProducts = [...state.products];
            let foundIndex = updatedProducts.findIndex(val => val.id === action.payload.productId);
            if (foundIndex !== -1) {
                updatedProducts[foundIndex].quantity = action.payload.quantity;
                return { ...state, products: updatedProducts };
            } else {
                console.log('Product not found in the cart\n');
                return state;
            }
        case ActionTypes.UPDATE_DELIVERY_COST:
            return { ...state, deliverySelect: action.payload }

        case ActionTypes.INITIALIZE_CART:
            return { products: [], deliverySelect: defaultDeliverySelect };

        default:
            return state;
    }
}

export default Cart;