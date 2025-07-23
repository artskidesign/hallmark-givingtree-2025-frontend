import Deed from './types/Deed';
import FeedDto from '../completeddeeds/types/FeedDto';

export interface DeedIdStore {
  [key: string]: Deed;
}

interface DeedState {
    deeds: Array<Deed>;
    communityCount: number;
    idStore: DeedIdStore;
    feed: Array<FeedDto>;
    feedIndex: number;
    allDeedsCompletedCopy: string;
    loaded: boolean;
  }
  
  export default DeedState;