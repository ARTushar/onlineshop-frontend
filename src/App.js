import React from 'react';
import './app.css';
import Main from './components/Main';
import AdminMain from './components/AdminMain';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        {/* <Main /> */}
        <AdminMain />
      </BrowserRouter>
    </div>
  );
}

export default App;
