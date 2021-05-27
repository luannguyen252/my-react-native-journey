import {
  FETCH_BADGES,
  UPDATE_PROGRESS
} from '../actions/types';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_BADGES:
      return action.payload
    case UPDATE_PROGRESS:
      return state.map(badge => {
        // checks to see if badge has been updated
        const updatedBadge = action.payload.find(el => el.achievementId === badge.id);
        if (updatedBadge) {
          return {
            ...badge, 
            details: { 
              ...badge.details, 
              progress: updatedBadge.progress 
            }
          };
        } else {
          return badge;
        }
      });
    default:
      return state;
  }
}