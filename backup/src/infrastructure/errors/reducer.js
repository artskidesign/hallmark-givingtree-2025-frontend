import * as types from './actionTypes';

const initialState = {message: ''}

const errorReducer = (state = initialState, action) => {
  const errorMessage = action.error && action.error.response && action.error.response.data && typeof action.error.response.data === 'string' ? action.error.response.data : 'Something went wrong!';
  switch(action.type) {
    case types.ERROR:
    return {
      ...state,
      message: errorMessage,
     };
    default:
    return state;
  }
}

export default errorReducer;