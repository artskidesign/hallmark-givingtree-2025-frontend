import { SETDEEDS, UPDATETOTAL, POPFEED, DeedActionTypes } from './actionTypes';
import { ADDCOMPLETEDDEED, REMOVECOMPLETEDDEED } from '../completeddeeds/actionTypes';
import DeedState, { DeedIdStore } from './DeedState';
import Deed from './types/Deed';
import { insertItemAtIndex } from '../../helpers';

const initialState: DeedState = {
  deeds: [],
  communityCount: 0,
  idStore: {},
  feed: [],
  feedIndex: -1,
  allDeedsCompletedCopy: '',
  loaded: false
};

const toIdStore: (deeds: Array<Deed>) => DeedIdStore = (deeds) => {
  return deeds.reduce((newObject, d) => {
    newObject[d.id] = d;
    return newObject;
  }, {} as DeedIdStore);
};

const deedReducer = (state = initialState, action: DeedActionTypes) => {
  switch (action.type) {
    case SETDEEDS:
      return {
        deeds: action.deeds,
        communityCount: Math.max(state.communityCount, action.communityCount),
        idStore: toIdStore(action.deeds),
        feed: action.feed,
        feedIndex: 0,
        allDeedsCompletedCopy: action.allDeedsCompletedCopy,
        loaded: true
      };
    case UPDATETOTAL:
      return {
        ...state,
        communityCount: Math.max(state.communityCount, action.communityCount),
      };
    case ADDCOMPLETEDDEED:
      const addedCountDeeds = state.deeds.map((x) => {
        return x.id === action.deedId ? { ...x, communityCount: x.communityCount + 1 } : { ...x };
      });
      return {
        ...state,
        communityCount: state.communityCount + 1,
        deeds: addedCountDeeds,
        idStore: toIdStore(addedCountDeeds),
        feed: action.feed
          ? insertItemAtIndex(
              state.feed,
              { deedId: action.deedId, name: action.name, sortOrder: state.feedIndex },
              state.feedIndex
            )
          : state.feed,
      };
    case REMOVECOMPLETEDDEED:
      const removedCountDeeds = state.deeds.map((x) => {
        return x.id === action.deedId ? { ...x, communityCount: x.communityCount - 1 } : { ...x };
      });
      return {
        ...state,
        communityCount: state.communityCount - 1,
        deeds: removedCountDeeds,
        idStore: toIdStore(removedCountDeeds),
      };
    case POPFEED: {
      return {
        ...state,
        feedIndex: action.newIndex,
      };
    }
    default:
      return state;
  }
};

export default deedReducer;
