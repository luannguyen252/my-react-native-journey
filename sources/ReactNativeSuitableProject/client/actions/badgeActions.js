import {
  FETCH_BADGES, 
  UPDATE_PROGRESS
} from './types';
import axios from 'axios';
import keys from '../config/keys';

/**
 * Retrieves all the badges from the API
 * 
 * API sends back data in the variable 'res.data'
 * Example res.data structure:
 * [
 *  { 'id': 123, 'details': {...}, 'relationships': {...} },
 *  { 'id': 456, 'details': {...}, 'relationships': {...} } 
 * ]
 */
export const fetchBadges = () => async dispatch => {
  try{
    const res = await axios.get(`${keys.URI}/v1/achievements`);
    dispatch({ type: FETCH_BADGES, payload: res.data });
  } catch(e) {
    console.log(e);
  }
}

/**
 * Updates the progress of necessary badges 
 * after an activity is marked complete
 * 
 * API sends back data in the variable 'res.data'
 * Example res.data structure:
 * {
 *  'id': (id of completed activity),
 *  'updates': [{'achievementID': 456, 'progress': 0.5}, {...}, {...}]
 * }
 */
export const updateProgress = (id, callback) => async dispatch => {
  try {
    const res = await axios.get(`${keys.URI}/v1/activities/${id}/complete`);
    dispatch({ type: UPDATE_PROGRESS, payload: res.data.updates });
    callback();
  } catch(e) {
    console.log(e);
  }
}