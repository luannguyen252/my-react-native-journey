import { combineReducers } from 'redux';
import { sampleReducer } from './sample/sample';

export const reducers = combineReducers({
  sample: sampleReducer
});
