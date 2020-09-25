import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { actions, createForms} from 'react-redux-form';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import InitialUserState from './forms';


const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            ...createForms({
                user: InitialUserState,
            })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}

export default ConfigureStore;