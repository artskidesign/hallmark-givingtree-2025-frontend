import { SETCOMPLETEDDEEDS, ADDCOMPLETEDDEED, REMOVECOMPLETEDDEED, CompletedDeedActionTypes } from './actionTypes';
import CompletedDeed from './types/CompletedDeed';

export function setCompletedDeeds(completedDeedsListDto: Array<CompletedDeed>): CompletedDeedActionTypes {
  return { type: SETCOMPLETEDDEEDS, completedDeeds: completedDeedsListDto};
}

export function addCompletedDeed(id: string, name: string, feed: boolean): CompletedDeedActionTypes {
  return { type: ADDCOMPLETEDDEED, deedId: id, name, feed};
}

export function removeCompletedDeed(id: string, name: string): CompletedDeedActionTypes {
  return { type: REMOVECOMPLETEDDEED, deedId: id, name};
}