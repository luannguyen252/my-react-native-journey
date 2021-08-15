export const UPDATE_NO_OF_ITEM_IN_RESTAURANT = 'UPDATE_NO_OF_ITEM_IN_RESTAURANT'
export const CLEAR_ITEMS_IN_RESTAURANT = 'CLEAR_ITEMS_IN_RESTAURANT'
export const UPDATE_NO_OF_ITEM_FOR_RESTAURANT_CHECKOUT =
  'UPDATE_NO_OF_ITEM_FOR_RESTAURANT_CHECKOUT'
export const FILTER_ITEMS_IN_RESTAURANT = 'FILTER_ITEMS_IN_RESTAURANT'
export const POPULATE_ITEMS_IN_RESTAURANT = 'POPULATE_ITEMS_IN_RESTAURANT'
export const TOGGLE_RESTAURANT_LOADING = 'TOGGLE_RESTAURANT_LOADING'
export const REMOVE_PINNED_ITEM_IN_RESTAURANT = 'REMOVE_PINNED_ITEM_IN_RESTAURANT'
export const FILTER_ITEMS_IN_RESTAURANT_BY_CATEGORY = 'FILTER_ITEMS_IN_RESTAURANT_BY_CATEGORY'



export const updateNoOfItemInRestaurant = (value, index, itemId) => ({
  type: UPDATE_NO_OF_ITEM_IN_RESTAURANT,
  payload: { value, index, itemId }
})

export const clearItemsInRestaurant = () => ({
  type: CLEAR_ITEMS_IN_RESTAURANT
})

export const updateNoOfItemForRestaurantCheckOut = (value, itemId) => ({
  type: UPDATE_NO_OF_ITEM_FOR_RESTAURANT_CHECKOUT,
  payload: { value, itemId }
})

export const filterItemsInRestaurant = value => ({
  type: FILTER_ITEMS_IN_RESTAURANT,
  payload: { value }
})

export const populateItemsInRestaurant = value => ({
  type: POPULATE_ITEMS_IN_RESTAURANT,
  payload: value
})

export const toggleRestaurantItemsLoading = value => ({
  type: TOGGLE_RESTAURANT_LOADING,
  payload: value
})

export const removePinnedItemInRestaurant = value => ({
  type: REMOVE_PINNED_ITEM_IN_RESTAURANT,
  payload: value
})

export const sortItemsInRestaurant = value => ({
  type: SORT_ITEMS_IN_RESTAURANT,
  payload: value
})

export const filterItemsInRestaurantByCategory = value => ({
  type: FILTER_ITEMS_IN_RESTAURANT_BY_CATEGORY,
  payload: { value }
})