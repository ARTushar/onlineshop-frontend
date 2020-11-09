import React from 'react';
import './app.css';
import { BrowserRouter } from 'react-router-dom';
import ConfigureStore from './redux/configureStore';
import { Provider } from 'react-redux';
import Main from './components/Main';
import { PersistGate } from 'redux-persist/integration/react';
import CustomizedSnackbar from './components/CustomizedSnackbar';

const {store, persistor} = ConfigureStore();


function App(props) {
  return (
    <div className="app">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <CustomizedSnackbar />
            <Main />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
