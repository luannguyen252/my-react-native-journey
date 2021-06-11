import { MODAL_LEVELS, closeModal, setModal } from './modal';
import { createAction, handleActions } from 'redux-actions';

import { GEOLOCATION_OPTIONS } from '../config/config';
import { Location } from 'expo';
import { calculateDistance } from '../util/calculate-distance';
import { formatGeolocationSuccessResponse } from '../util/format-geolocation-success-response';
import { updateSpeed } from './speed';

const DEFAULT_STATE = {
    accuracy: 40,
    distanceTravelled: 0, // in meters
    geolocationSpeed: 0,
    geolocationTimestamp: 0,
    heading: -1, // set to -1 to prevent flash of 0 degrees of ('N') on the compass on load
    lastPosition: {},
    routeCoordinates: [],
};

const SUCCESS = 'geolocation/SUCCESS';

export default handleActions({
    [SUCCESS]: (state, action) => {
        const result = action.payload;
        const { accuracy, currentPosition, heading, speed, timestamp } = result;
        const { distanceTravelled, lastPosition, routeCoordinates } = state;

        let updatedDistanceTraveled = distanceTravelled;

        if (calculateDistance(lastPosition, currentPosition) > 5) {
            updatedDistanceTraveled = distanceTravelled + calculateDistance(lastPosition, currentPosition);
        }

        return Object.assign({}, state, {
            accuracy,
            distanceTravelled: updatedDistanceTraveled,
            geolocationSpeed: speed,
            geolocationTimestamp: timestamp,
            heading,
            lastPosition: currentPosition,
            routeCoordinates: routeCoordinates.concat([currentPosition])
        });
    }
}, DEFAULT_STATE);

export const geolocationSuccess = createAction(SUCCESS);

export const watchCurrentPosition = () => dispatch => {

    return Location.watchPositionAsync(GEOLOCATION_OPTIONS,
        success => {
            dispatch(closeModal());

            const result = formatGeolocationSuccessResponse(success);
            dispatch(geolocationSuccess(result));
            return dispatch(updateSpeed());
        },
        error => {
            setModal({
                hasLoadIndicator: true,
                heading: 'Difficulty Finding Location',
                level: MODAL_LEVELS.ERROR,
                message: 'Please wait while we try again...'
            });
        }
    );
};
