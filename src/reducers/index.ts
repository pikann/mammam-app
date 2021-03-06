import {combineReducers} from 'redux';

import appReducer from '../store/reducers';
import registerReducer from '../screens/Register/store/reducers';
import loginReducer from '../screens/Login/store/reducers';
import updateProfileReducer from '../screens/UpdateProfile/store/reducers';
import homeReducer from '../screens/Home/store/reducers';
import postReducer from '../screens/Post/store/reducers';
import passwordReducer from '../screens/Password/store/reducers';
import userReducer from '../screens/User/store/reducers';
import watchingReducer from '../screens/Watching/store/reducers';
import searchReducer from '../screens/Search/store/reducers';
import notificationReducer from '../screens/Notification/store/reducers';
import mapReducer from '../screens/Map/store/reducers';
import userRestaurantReducer from '../screens/UserRestaurant/store/reducers';
import enterAddressReducer from '../screens/EnterAddress/store/reducers';
import createRestaurantReducer from '../screens/CreateRestaurant/store/reducers';
import restaurantReducer from '../screens/Restaurant/store/reducers';

const rootReducer = combineReducers({
  appReducer,
  registerReducer,
  loginReducer,
  updateProfileReducer,
  homeReducer,
  postReducer,
  passwordReducer,
  userReducer,
  watchingReducer,
  searchReducer,
  notificationReducer,
  mapReducer,
  userRestaurantReducer,
  enterAddressReducer,
  createRestaurantReducer,
  restaurantReducer,
});
export default rootReducer;
