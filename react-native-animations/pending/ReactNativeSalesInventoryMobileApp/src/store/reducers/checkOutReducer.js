import * as Actions from '../actions'

const initialState = {
  transactionId: '',
  transactionDetails: []
}

const checkOutReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.INCREASE_NO_IN_CHECKOUT: {
      return {
        ...state
      }
    }
    default: {
      return state
    }
  }
}

export default checkOutReducer
