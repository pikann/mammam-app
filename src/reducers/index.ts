import {combineReducers} from 'redux';

import appReducer from '../store/reducers';
import registerReducer from '../screens/Register/store/reducers';
import loginReducer from '../screens/Login/store/reducers';
import updateProfileReducer from '../screens/UpdateProfile/store/reducers';
import homeReducer from '../screens/Home/store/reducers';
import postReducer from '../screens/Post/store/reducers';
import userReducer from '../screens/User/store/reducers';

const rootReducer = combineReducers({
  appReducer,
  registerReducer,
  loginReducer,
  updateProfileReducer,
  homeReducer,
  postReducer,
  userReducer,
});
export default rootReducer;
