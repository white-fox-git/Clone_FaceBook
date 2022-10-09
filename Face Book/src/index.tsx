import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {Reset} from 'styled-reset'
import App from './util/App';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './util/Redux/store';
import {Provider} from 'react-redux';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store = {store}>
    <PersistGate loading={null} persistor={persistor}>
      <Reset />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
