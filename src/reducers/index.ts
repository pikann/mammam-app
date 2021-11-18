import {combineReducers} from 'redux';

import appReducer from '../store/reducers';
import registerReducer from '../screens/Register/store/reducers';

const rootReducer = combineReducers({
  appReducer,
  registerReducer,
});
export default rootReducer;
