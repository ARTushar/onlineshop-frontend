import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { actions, createForms} from 'react-redux-form';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import  { InitialOrderState, InitialUserState, InitialProductFormState } from './forms';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Products } from './products';
import Cart from './cart';


const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            cart: Cart,
            ...createForms({
                user: InitialUserState,
                order: InitialOrderState,
                product: InitialProductFormState
            }),
            products: Products,
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}

export default ConfigureStore;