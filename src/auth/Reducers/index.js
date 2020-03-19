import { combineReducers } from 'redux';

import { authentication } from './authenticationReducer';
import { users } from './userReducer';
import { alert } from './alertReducer';
import { reducer } from './textAlignReducer';
import { multiDelete } from './multiDelete';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  reducer,
  multiDelete
});

export default rootReducer;