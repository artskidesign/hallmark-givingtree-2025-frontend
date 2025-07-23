import { SETCOMPLETEDDEEDS, ADDCOMPLETEDDEED, REMOVECOMPLETEDDEED, CompletedDeedActionTypes } from './actionTypes';
import { LOGIN, LOGOUT } from '../users/actionTypes';
import CompletedDeedState from './CompletedDeedState';

const initialState: CompletedDeedState = {
  completedDeeds: [],
  apiCalled: false,
};

const completedDeedReducer = (state = initialState, action: CompletedDeedActionTypes) => {
  switch (action.type) {
    case SETCOMPLETEDDEEDS:
      return {
        completedDeeds: action.completedDeeds,
        apiCalled: true,
      };
    case ADDCOMPLETEDDEED:
      return {
        ...state,
        completedDeeds: [
          ...state.completedDeeds,
          { deedId: action.deedId, sortOrder: state.completedDeeds.length + 1 },
        ],
      };
    case REMOVECOMPLETEDDEED:
      return {
        ...state,
        completedDeeds: state.completedDeeds.filter((x) => x.deedId !== action.deedId),
      };
    case LOGOUT:
      return initialState;
    case LOGIN:
      return {
        completedDeeds: action.apiLogin ? action.completedDeeds : state.completedDeeds,
        apiCalled: action.apiLogin
      };
    default:
      return state;
  }
};

export default completedDeedReducer;
