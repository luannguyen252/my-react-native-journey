import { combineReducers } from 'redux';
import auth from './authReducer';
import jobs from './jobsReducer';
import likes from './likesReducer';

export default combineReducers({
  auth, jobs, likes
});