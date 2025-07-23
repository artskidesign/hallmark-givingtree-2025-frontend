import * as types from "./actionTypes";

const initialState = {};

const webViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_IS_WEBVIEW:
      return {
        webView: action.isWebview,
      };
    default:
      return state;
  }
};

export default webViewReducer;
