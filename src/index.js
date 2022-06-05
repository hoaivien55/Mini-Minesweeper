import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";


import './reset.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// console.log(process.env.REACT_APP_ROOT_API)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>// https://github.com/facebook/react/issues/16295
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(// console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
