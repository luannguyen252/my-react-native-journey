import { createAction, handleActions } from 'redux-actions';

import { ACCELEROMETER_UPDATE_INTERVAL } from '../config/config';
import { convertMillisecondsToSeconds } from '../util/convert-milliseconds-to-seconds';
import { getTotalAcceleration } from '../util/get-total-acceleration';
import { store } from '../../main';

const DEFAULT_STATE = {
    lastCalculatedSpeed: 0,
    lastGeolocationTimestamp: 0,
    speeds: [0],
    topSpeed: 0
};

const SUCCESS = 'speed/SUCCESS';
const RESET_SPEEDS = 'speed/RESET_SPEEDS';
const RESET_TOP_SPEED = 'speed/RESET_TOP_SPEED';

export default handleActions({
    [RESET_SPEEDS]: state => Object.assign({}, state, { speeds: DEFAULT_STATE.speeds }),
    [RESET_TOP_SPEED]: state => Object.assign({}, state, { topSpeed: DEFAULT_STATE.topSpeed }),
    [SUCCESS]: (state, action) => {
        const { lastCalculatedSpeed, lastGeolocationTimestamp, speeds, topSpeed } = action.payload;

        return Object.assign({}, state, {
            lastCalculatedSpeed,
            lastGeolocationTimestamp,
            speeds,
            topSpeed
        });
    }
}, DEFAULT_STATE);

export const resetSpeeds = createAction(RESET_SPEEDS);
export const resetTopSpeed = createAction(RESET_TOP_SPEED);
export const updateSpeedSuccess = createAction(SUCCESS);

export const updateSpeed = () => dispatch => {

    const { geolocationTimestamp, geolocationSpeed } = store.getState().geolocationDuck;
    const { accelerationMatrix } = store.getState().accelerationDuck;
    const { lastCalculatedSpeed, lastGeolocationTimestamp, speeds, topSpeed } = store.getState().speedDuck;

    const updateInterval = convertMillisecondsToSeconds(ACCELEROMETER_UPDATE_INTERVAL);
    let updatedSpeed;

    if (geolocationTimestamp > lastGeolocationTimestamp) {
        updatedSpeed = geolocationSpeed;
    } else {
        updatedSpeed = (updateInterval * getTotalAcceleration(accelerationMatrix)) + geolocationSpeed;
    }

    updatedSpeed = updatedSpeed > 0 ? updatedSpeed : 0;

    const updatedSpeeds = speeds.concat([updatedSpeed]);
    const updatedTopSpeed = updatedSpeed > topSpeed ? updatedSpeed : topSpeed;

    return dispatch(updateSpeedSuccess({
        lastCalculatedSpeed: updatedSpeed,
        lastGeolocationTimestamp: geolocationTimestamp,
        speeds: updatedSpeeds,
        topSpeed: updatedTopSpeed
    }));
};
