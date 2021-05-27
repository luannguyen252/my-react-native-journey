import {
  SET_DATA
} from '../actions/types'

const INITIAL_STATE = {
  schoolId: null,
  schoolInfo: null
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SET_DATA:
      return action.payload
    default:
      return state;
  }
}