import { LOGIN, LOGOUT, SEENMODAL, UserActionTypes } from './actionTypes';
import { UserDto } from '../../types';

export function login(user: UserDto, apiLogin: boolean): UserActionTypes {
  return { type: LOGIN, ...user, apiLogin };
}

export function logout(): UserActionTypes {
  return { type: LOGOUT };
}

export function viewedModal(): UserActionTypes {
  return { type: SEENMODAL }
}
