import React from 'react';
import './app.css';
import { BrowserRouter, withRouter } from 'react-router-dom';
import ConfigureStore from './redux/configureStore';
import { Provider, connect } from 'react-redux';
import Main from './components/Main';

const store = ConfigureStore();

/* const mapStateToProps = state => {
  return {
    
  }
} */


function App(props) {
  return (
    <div className="app">
      <Provider store={store}>
        <BrowserRouter>
            <Main />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
