import * as types from "./actionTypes";

// eslint-disable-next-line import/prefer-default-export
export const addIsWebview = (isWebview) => {
  return { type: types.ADD_IS_WEBVIEW, isWebview };
};
