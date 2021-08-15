export const UPDATE_NO_OF_ITEM_IN_MORE_BAR = 'UPDATE_NO_OF_ITEM_IN_MORE_BAR'
export const CLEAR_ITEMS_IN_MORE_BAR = 'CLEAR_ITEMS_IN_MORE_BAR'
export const UPDATE_NO_OF_ITEM_IN_MORE_RESTAURANT =
  'UPDATE_NO_OF_ITEM_IN_MORE_RESTAURANT'
export const CLEAR_ITEMS_IN_MORE_RESTAURANT = 'CLEAR_ITEMS_IN_MORE_RESTAURANT'
export const CHANGE_SELECTED_ORDER_TRANSACTION_ID =
  'CHANGE_SELECTED_ORDER_TRANSACTION_ID'
export const POPULATE_ITEMS_IN_MORE_BAR = 'POPULATE_ITEMS_IN_MORE_BAR'
export const POPULATE_ITEMS_IN_MORE_RESTAURANT =
  'POPULATE_ITEMS_IN_MORE_RESTAURANT'
export const FILTER_ITEMS_IN_MORE_BAR = 'FILTER_ITEMS_IN_MORE_BAR'
export const FILTER_ITEMS_IN_MORE_RESTAURANT = 'FILTER_ITEMS_IN_MORE_RESTAURANT'
export const SORT_ITEMS_IN_MORE_BAR = 'SORT_ITEMS_IN_MORE_BAR'
export const SORT_ITEMS_IN_MORE_RESTAURANT = 'SORT_ITEMS_IN_MORE_RESTAURANT'


export const updateNoOfItemInMoreBar = (value, index, itemId) => ({
  type: UPDATE_NO_OF_ITEM_IN_MORE_BAR,
  payload: { value, index, itemId }
})

export const clearItemsInMoreBar = () => ({
  type: CLEAR_ITEMS_IN_MORE_BAR
})

export const updateNoOfItemInMoreRestaurant = (value, index, itemId) => ({
  type: UPDATE_NO_OF_ITEM_IN_MORE_RESTAURANT,
  payload: { value, index, itemId }
})

export const clearItemsInMoreRestaurant = () => ({
  type: CLEAR_ITEMS_IN_MORE_RESTAURANT
})

export const changeSelectedOrderTransactionId = transactionId => ({
  type: CHANGE_SELECTED_ORDER_TRANSACTION_ID,
  payload: transactionId
})

export const populateMoreItemsInBar = value => ({
  type: POPULATE_ITEMS_IN_MORE_BAR,
  payload: value
})

export const populateMoreItemsInRestaurant = value => ({
  type: POPULATE_ITEMS_IN_MORE_RESTAURANT,
  payload: value
})

export const filterItemsInMoreBar = value => ({
  type: FILTER_ITEMS_IN_MORE_BAR,
  payload: { value }
})

export const filterItemsInMoreRestaurant = value => ({
  type: FILTER_ITEMS_IN_MORE_RESTAURANT,
  payload: { value }
})

export const sortMoreItemsInBar = value => ({
  type: SORT_ITEMS_IN_MORE_BAR,
  payload: value
})

export const sortMoreItemsInRestaurant = value => ({
  type: FILTER_ITEMS_IN_MORE_RESTAURANT,
  payload: value
})
