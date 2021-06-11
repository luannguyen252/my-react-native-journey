import { createAction, handleActions } from 'redux-actions';

export const MODAL_LEVELS = {
    WARNING: 0,
    SUCCESS: 1,
    ERROR: 2
};

const DEFAULT_STATE = {
    modalButtonFunction: null,
    modalButtonLabel: null,
    modalHasLoadIndicator: false,
    modalHeading: null,
    modalIsActive: false,
    modalLevel: MODAL_LEVELS.WARNING,
    modalMessage: null
};

const OPEN_MODAL = 'modal/OPEN_MODAL';
const CLOSE_MODAL = 'modal/CLOSE_MODAL';

export default handleActions(
    {
        [CLOSE_MODAL]: state => Object.assign({}, state, { modalIsActive: false }),
        [OPEN_MODAL]: (state, action) => {
            const { buttonFunction, buttonLabel, hasLoadIndicator, heading, level, message } = action.payload;

            return Object.assign({}, state, {
                modalButtonFunction: buttonFunction,
                modalButtonLabel: buttonLabel,
                modalHasLoadIndicator: hasLoadIndicator,
                modalHeading: heading,
                modalIsActive: true,
                modalLevel: level ? level : MODAL_LEVELS.WARNING,
                modalMessage: message
            });
        }
    },
    DEFAULT_STATE
);

export const openModal = createAction(OPEN_MODAL);
export const closeModal = createAction(CLOSE_MODAL);

export const setModal = ({buttonFunction, buttonLabel, hasLoadIndicator, heading, level, message}) => dispatch =>{
    return dispatch(openModal({buttonFunction, buttonLabel, hasLoadIndicator, heading, level, message}));
};
