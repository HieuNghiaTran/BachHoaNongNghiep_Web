import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import RouterCustom from './router';
import { Provider } from 'react-redux';
import store from './store';
import { UserProvider } from './context/userContext';
import '../src/components/Css/App.css'
import { CartProvider } from './context/cartContext';
import { HisProvider } from './context/historyContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <UserProvider>
      <CartProvider>
        <HisProvider>
          <App />
        </HisProvider>
      </CartProvider>
    </UserProvider>
  </Provider>,
  document.getElementById('root')
);
