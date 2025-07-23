import CompletedDeed from '../completeddeeds/types/CompletedDeed';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SEENMODAL = 'SEENMODAL';

export interface LoginAction {
    type: typeof LOGIN;
    id: string;
    emailAddress: string;
    name: string;
    completedDeeds: Array<CompletedDeed>;
    feed: boolean;
    apiLogin: boolean;
}

export interface LogoutAction {
    type: typeof LOGOUT;    
}

export interface SeenModalAction {
    type: typeof SEENMODAL;    
}

export type UserActionTypes = LoginAction | LogoutAction | SeenModalAction;