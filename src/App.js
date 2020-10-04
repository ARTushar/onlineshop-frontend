import React from 'react';
import './app.css';
import { BrowserRouter, withRouter } from 'react-router-dom';
import ConfigureStore from './redux/configureStore';
import { Provider, connect } from 'react-redux';
import Main from './components/Main';
import { PersistGate } from 'redux-persist/integration/react';

const {store, persistor} = ConfigureStore();

/* const mapStateToProps = state => {
  return {
    
  }
} */


function App(props) {
  return (
    <div className="app">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
