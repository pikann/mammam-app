import produce from 'immer';

import * as WatchActions from '../actions';

export const initialState = {
  gettingType: '',
  gettingPayload: {},
  indexBegin: 0,
  page: 0,
};

export type WatchingState = typeof initialState;

const watchingReducer = (state = initialState, {type, payload}: any) =>
  produce(state, (draft: WatchingState) => {
    switch (type) {
      case WatchActions.Types.SET_GETTING_TYPE.begin:
        draft.gettingType = payload.gettingType;
        draft.gettingPayload = payload.gettingPayload;
        draft.indexBegin = payload.indexBegin;
        draft.page = payload.page;
        break;
      case WatchActions.Types.SET_PAGE.begin:
        draft.page = payload;
        break;
      default:
        break;
    }
  });

export default watchingReducer;
