import {combineReducers} from 'redux';

import appReducer from '../store/reducers';
import registerReducer from '../screens/Register/store/reducers';
import loginReducer from '../screens/Login/store/reducers';

const rootReducer = combineReducers({
  appReducer,
  registerReducer,
  loginReducer,
});
export default rootReducer;
