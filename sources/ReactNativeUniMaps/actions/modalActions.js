import {
  OPEN_MODAL,
  CLOSE_MODAL
} from './types';

export const openModal = modal => async dispatch => {
  dispatch({ type: OPEN_MODAL, payload: modal });
};

export const closeModal = () => async dispatch => {
  dispatch({ type: CLOSE_MODAL });
};