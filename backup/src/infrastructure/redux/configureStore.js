import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import rootReducer from './rootReducer';

export const history = createBrowserHistory();

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
    }) : compose;

export default function configureStore(preloadedState) {
    const sagaMiddleware = [];
    const store = createStore(
        rootReducer(history),
        preloadedState,
        composeEnhancers(applyMiddleware(
            routerMiddleware(history),
            ...sagaMiddleware
        ))
    );
    return store;
}