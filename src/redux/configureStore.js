import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { actions, createForms, formReducer, modelReducer} from 'react-redux-form';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import  { InitialOrderState, InitialUserState, InitialProductFormState } from './forms';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Products } from './products';
import Cart from './cart';
import Wishlist from './wishlist';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import Order from './order';
import { Auth } from './auth';

const ConfigureStore = () => {
  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
  }

  const profilePersistConfig = {
    key: 'profile',
    storage: storageSession,
  }

  const orderPersistConfig = {
    key: 'order',
    storage: storageSession
  }

  const persistedReducer = persistReducer(persistConfig,
    combineReducers({
      wishlist: Wishlist,
      cart: Cart,
      auth: Auth,
      order: persistReducer(orderPersistConfig, Order),
      // ...createForms({
      //   user: InitialUserState,
      // }),
      user: persistReducer(profilePersistConfig, modelReducer('user', InitialUserState)),
      forms: formReducer(''),
      products: Products
    }))

  const store = createStore(persistedReducer,
    applyMiddleware(thunk, logger)
  );
  const persistor = persistStore(store)
  return { store, persistor };
}

export default ConfigureStore;