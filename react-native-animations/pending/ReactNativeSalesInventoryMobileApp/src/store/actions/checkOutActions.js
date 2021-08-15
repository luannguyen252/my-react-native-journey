export const INCREASE_NO_IN_CHECKOUT = 'INCREASE_NO_IN_CHECKOUT'
export const DECREASE_NO_IN_CHECKOUT = 'DECREASE_NO_IN_CHECKOUT'

export const increaseNoInCheckOut = item => ({
  type: INCREASE_NO_IN_CHECKOUT,
  payload: item
})

export const decreaseNoInCheckOut = () => {}
