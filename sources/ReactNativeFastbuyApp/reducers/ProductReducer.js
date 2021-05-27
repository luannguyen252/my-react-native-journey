import { PRODUCT_CLEAN, PRODUCT_DELETE, PRODUCT_SAVE, PRODUCT_UPDATE } from '../actions/types';

const INITIAL_STATE = {
  id: null,
  imageUrl: '',
  name: '',
  price: '',
  color: '',
  size: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT_CLEAN:
      return INITIAL_STATE;

    case PRODUCT_DELETE:
      return INITIAL_STATE;

    case PRODUCT_SAVE:
      return INITIAL_STATE;

    case PRODUCT_UPDATE:
      return {
        ...state,
        [action.payload.prop]: action.payload.value
      };

    default:
      return state;
  }
};
