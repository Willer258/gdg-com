import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/app/store';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <Provider store={store}>
    <React.Fragment>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </React.Fragment>
  </Provider>
  </React.StrictMode>,
)
reportWebVitals();