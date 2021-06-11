import { createAction, handleActions } from 'redux-actions';

export const UNIT_MEASUREMENT = {
    KILOMETERS: 0,
    MILES: 1
};

const DEFAULT_STATE = { unitMeasurement: UNIT_MEASUREMENT.MILES };

const TOGGLE = 'unitMeasurement/TOGGLE';
const SET = 'unitMeasurement/SET';

export default handleActions(
    {
        [SET]: (state, action) => Object.assign({}, state, { speedMeasurement: action.payload }),
        [TOGGLE]: state => {
            const { unitMeasurement } = state;
            const updated = unitMeasurement === UNIT_MEASUREMENT.KILOMETERS ? UNIT_MEASUREMENT.MILES : UNIT_MEASUREMENT.KILOMETERS;
            
            return Object.assign({}, state, { unitMeasurement: updated });
        }
    },
    DEFAULT_STATE
);

export const setUnitMeasurement = createAction(SET);
export const toggleUnitMeasurement = createAction(TOGGLE);
