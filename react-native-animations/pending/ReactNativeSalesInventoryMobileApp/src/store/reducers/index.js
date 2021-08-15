import { combineReducers } from 'redux'
import homeReducer from './homeReducer'
import barReducer from './barReducer'
import restaurantReducer from './restaurantReducer'
import cartReducer from './cartReducer'
import checkOutReducer from './checkOutReducer'
import moreItemsToOrderReducer from './moreItemsToOrderReducer'
import { LOGOUT } from '../actions/homeActions'

const appReducer = combineReducers({
  homeReducer: homeReducer,
  barReducer: barReducer,
  restaurantReducer: restaurantReducer,
  cartReducer: cartReducer,
  checkOutReducer: checkOutReducer,
  moreItemsToOrderReducer: moreItemsToOrderReducer
})

export default rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined
  }

  return appReducer(state, action)
}
