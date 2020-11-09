import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Products } from './products';
import Cart from './cart';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import Order from './order';
import { Auth } from './auth';
import Register from './register';
import User from './user';
import Categories from './categories';
import Alert from './alert';
import Districts from './districts';

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

  const districtsPersistConfig = {
    key: 'districts',
    storage: storageSession
  }

  const categoriesPersistConfig = {
    key: 'categories',
    storage: storageSession
  }

  const persistedReducer = persistReducer(persistConfig,
    combineReducers({
      districts: persistReducer(districtsPersistConfig, Districts),
      alert: Alert,
      cart: Cart,
      auth: Auth,
      register: Register,
      order: persistReducer(orderPersistConfig, Order),
      user: persistReducer(profilePersistConfig, User),
      products: Products,
      categories: persistReducer(categoriesPersistConfig, Categories)
    }))

  const store = createStore(persistedReducer,
    applyMiddleware(thunk, logger)
  );
  const persistor = persistStore(store)
  return { store, persistor };
}

export default ConfigureStore;