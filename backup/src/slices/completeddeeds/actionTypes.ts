import CompletedDeed from './types/CompletedDeed';
import { LoginAction, LogoutAction } from '../users/actionTypes';

export const SETCOMPLETEDDEEDS = 'SETCOMPLETEDDEEDS';
export const ADDCOMPLETEDDEED = 'ADDCOMPLETEDDEED';
export const REMOVECOMPLETEDDEED = 'REMOVECOMPLETEDDEED';


interface SetCompletedDeedsAction {
    type: typeof SETCOMPLETEDDEEDS;
    completedDeeds: Array<CompletedDeed>;
}

export interface AddCompletedDeedAction {
    type: typeof ADDCOMPLETEDDEED;
    deedId: string;
    name: string;
    feed: boolean;
}

export interface RemovedCompletedDeedAction {
    type: typeof REMOVECOMPLETEDDEED;
    deedId: string;
    name: string;
}

export type CompletedDeedActionTypes = SetCompletedDeedsAction | AddCompletedDeedAction | RemovedCompletedDeedAction | LogoutAction | LoginAction;