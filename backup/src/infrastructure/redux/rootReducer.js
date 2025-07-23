import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import isWebViewReducer from '../isWebView/reducer';
import userReducer from '../../slices/users/reducer';
import deedReducer from '../../slices/deeds/reducer';
import completedDeedReducer from '../../slices/completeddeeds/reducer';

const rootReducer = (history) =>
combineReducers({
  isWebView: isWebViewReducer,
  router: connectRouter(history),
  user: userReducer,
  deed: deedReducer,
  completedDeed: completedDeedReducer
});

export default rootReducer;
