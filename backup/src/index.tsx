import "react-app-polyfill/ie11";
import 'react-app-polyfill/stable';
// import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';


import smoothscroll from "smoothscroll-polyfill";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { BreakpointsProvider } from "react-with-breakpoints";
import ErrorBoundary from "./infrastructure/errors/ErrorBoundary";
import configureStore from "./infrastructure/redux/configureStore";
import { FreewheelProvider } from './infrastructure/freewheel/provider';

smoothscroll.polyfill();

const store = configureStore();

const breakpoints = {
  small: 576,
  medium: 768,
  large: 992,
  xlarge: Infinity,
};

ReactDOM.render(
  <ErrorBoundary>
    <BreakpointsProvider breakpoints={breakpoints}>
      <Provider store={store}>
        <FreewheelProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </FreewheelProvider>
      </Provider>
    </BreakpointsProvider>
  </ErrorBoundary>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
