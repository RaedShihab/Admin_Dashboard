import { combineReducers } from 'redux';

import { authentication } from './authenticationReducer';
import { users } from './userReducer';
import { alert } from './alertReducer';
import { reducer } from './textAlignReducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  reducer,
});

export default rootReducer;