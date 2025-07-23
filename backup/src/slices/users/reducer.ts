import { LOGIN, LOGOUT, UserActionTypes, SEENMODAL } from './actionTypes';
import UserState from './UserState';

const initialState: UserState = {
  id: '',
  name: '',
  emailAddress: '',
  feed: false,
  hasSeenModal: false,
};

const userReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case LOGIN:
      return {
        id: action.id,
        name: action.name,
        emailAddress: action.emailAddress,
        feed: action.feed,
        hasSeenModal: true,
      };
    case LOGOUT:
      return {
        ...initialState,
        hasSeenModal: state.hasSeenModal,
      };
    case SEENMODAL:
      return {
        ...state,
        hasSeenModal: true,
      };
    default:
      return state;
  }
};

export default userReducer;
