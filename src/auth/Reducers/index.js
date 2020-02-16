import { combineReducers } from 'redux';

import { authentication } from './authenticationReducer';
import { users } from './userReducer';
import { alert } from './alertReducer';
import { reducer } from './textAlignReducer';
import { deleteCategories } from './deleteCategories';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  reducer,
  deleteCategories
});

export default rootReducer;