import { createAction, handleActions } from 'redux-actions';

import { ACCELEROMETER_UPDATE_INTERVAL } from '../config/config';
import { Accelerometer } from 'expo';
import { removeGravityFromAccelerationMatrix } from '../util/remove-gravity-from-acceleration-matrix';
import { updateSpeed } from './speed';

const DEFAULT_STATE = { accelerationMatrix: { x: 0, y: 0, z: 0 } };

const SUCCESS = 'acceleration/SUCCESS';

export default handleActions({
    [SUCCESS]: (state, action) => {
        const accelerationMatrix = removeGravityFromAccelerationMatrix(action.payload);
        return Object.assign({}, state, { accelerationMatrix });
    }
}, DEFAULT_STATE);

export const accelerationSuccess = createAction(SUCCESS);

export const listenToAcceleration = () => dispatch => {
    Accelerometer.setUpdateInterval(ACCELEROMETER_UPDATE_INTERVAL);

    return Accelerometer.addListener(success => {
        dispatch(accelerationSuccess(success));
        return dispatch(updateSpeed());
    });
};
