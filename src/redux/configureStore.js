import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { actions, createForms} from 'react-redux-form';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import  { InitialOrderState, InitialUserState, InitialProductFormState } from './forms';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Products } from './products';
import Cart from './cart';
import Wishlist from './wishlist';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import Order from './order';

const ConfigureStore = () => {
  const persistConfig = {
    key: 'cart',
    storage,
    whitelist: ['cart']
  }

  const persistedReducer = persistReducer(persistConfig,
    combineReducers({
      wishlist: Wishlist,
      cart: Cart,
      order: Order,
      ...createForms({
        user: InitialUserState,
        product: InitialProductFormState
      }),
      products: Products
    }))

  const store = createStore(persistedReducer,
    applyMiddleware(thunk, logger)
  );
  const persistor = persistStore(store)
  return { store, persistor };
}

export default ConfigureStore;