export const UPDATE_NO_OF_ITEM_IN_BAR = 'UPDATE_NO_OF_ITEM_IN_BAR'
export const CLEAR_ITEMS_IN_BAR = 'CLEAR_ITEMS_IN_BAR'
export const UPDATE_NO_OF_ITEM_FOR_BAR_CHECKOUT =
  'UPDATE_NO_OF_ITEM_FOR_BAR_CHECKOUT'
export const FILTER_ITEMS_IN_BAR = 'FILTER_ITEMS_IN_BAR'
export const POPULATE_ITEMS_IN_BAR = 'POPULATE_ITEMS_IN_BAR'
export const TOGGLE_BAR_LOADING = 'TOGGLE_BAR_LOADING'
export const REMOVE_PINNED_ITEM_IN_BAR = 'REMOVE_PINNED_ITEM_IN_BAR'
export const SORT_ITEMS_IN_BAR = 'SORT_ITEMS_IN_BAR'
export const FILTER_ITEMS_IN_BAR_BY_CATEGORY = 'FILTER_ITEMS_IN_BAR_BY_CATEGORY'


export const updateNoOfItemInBar = (value, index, itemId) => ({
  type: UPDATE_NO_OF_ITEM_IN_BAR,
  payload: { value, index, itemId }
})

export const clearItemsInBar = () => ({
  type: CLEAR_ITEMS_IN_BAR
})

export const updateNoOfItemForBarCheckOut = (value, itemId) => ({
  type: UPDATE_NO_OF_ITEM_FOR_BAR_CHECKOUT,
  payload: { value, itemId }
})

export const filterItemsInBar = value => ({
  type: FILTER_ITEMS_IN_BAR,
  payload: { value }
})

export const populateItemsInBar = value => ({
  type: POPULATE_ITEMS_IN_BAR,
  payload: value
})

export const toggleBarItemsLoading = value => ({
  type: TOGGLE_BAR_LOADING,
  payload: value
})

export const removePinnedItemInBar = value => ({
  type: REMOVE_PINNED_ITEM_IN_BAR,
  payload: value
})

export const sortItemsInBar = value => ({
  type: SORT_ITEMS_IN_BAR,
  payload: value
})

export const filterItemsInBarByCategory = value => ({
  type: FILTER_ITEMS_IN_BAR_BY_CATEGORY,
  payload: { value }
})
