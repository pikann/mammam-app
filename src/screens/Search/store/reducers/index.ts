import produce from 'immer';
import {IAuthor} from '../../../../interfaces/post';

import * as SearchActions from '../actions';

export const initialState = {
  users: [] as IAuthor[],
};

export type SearchState = typeof initialState;

const searchReducer = (state = initialState, {type, payload}: any) =>
  produce(state, (draft: SearchState) => {
    switch (type) {
      case SearchActions.Types.SEARCH_USERS.succeeded:
        draft.users = payload;
        break;
      case SearchActions.Types.APPEND_SEARCH_USERS.succeeded:
        if (payload.length > 0) {
          draft.users = [...draft.users, ...payload];
        }
        break;
      default:
        break;
    }
  });

export default searchReducer;
