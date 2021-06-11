import { createAction, handleActions } from 'redux-actions';

// action types
const UPDATE = 'sample/UPDATE';
const RESET = 'sample/RESET';

// action creators
export const updateSampleData = createAction(UPDATE);
export const resetSampleData = createAction(RESET);

// default state
export const DEFAULT_STATE = {
  data: 0
};

// reducer
export const sampleReducer = handleActions(
  {
    [UPDATE]: state => ({ ...state, data: state.data + 1 }),
    [RESET]: () => DEFAULT_STATE
  },
  DEFAULT_STATE
);

// selectors
export const selectSample = state => state.sample || DEFAULT_STATE;
export const selectSampleData = state => selectSample(state).data || DEFAULT_STATE.data;

// thunks
