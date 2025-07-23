import { SETDEEDS, UPDATETOTAL, POPFEED, DeedActionTypes } from './actionTypes';
import DeedsListDto from './types/DeedsListDto';

export function setDeeds(deedsListDto: DeedsListDto): DeedActionTypes {
  return { type: SETDEEDS, ...deedsListDto };
}

export function updateTotal(total: number): DeedActionTypes {
  return { type: UPDATETOTAL, communityCount: total };
}

export function popFeed(newIndex: number): DeedActionTypes {
  return { type: POPFEED, newIndex };
}
