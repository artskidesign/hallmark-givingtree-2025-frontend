import Deed from './types/Deed';
import FeedDto from '../completeddeeds/types/FeedDto';
import { AddCompletedDeedAction, RemovedCompletedDeedAction } from '../completeddeeds/actionTypes';

export const SETDEEDS = 'SETDEEDS';
export const UPDATETOTAL = 'UPDATETOTAL';
export const POPFEED = 'POPFEED';

interface SetDeedsAction {
  type: typeof SETDEEDS;
  deeds: Array<Deed>;
  communityCount: number;  
  feed: Array<FeedDto>;
  allDeedsCompletedCopy: string;
}

interface UpdateTotalAction {
  type: typeof UPDATETOTAL;
  communityCount: number;
}


interface PopFeedAction {
  type: typeof POPFEED;
  newIndex: number;
}

export type DeedActionTypes = SetDeedsAction | UpdateTotalAction | AddCompletedDeedAction | RemovedCompletedDeedAction | PopFeedAction;
