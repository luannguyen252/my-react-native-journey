export const CHANGE_TAB = 'CHANGE_TAB'
export const TOGGLE_ARE_YOU_SURE_MODAL_VISIBILTY =
  'TOGGLE_ARE_YOU_SURE_MODAL_VISIBILTY'
export const TOGGLE_CHECKOUT_BOTTOM_SHEET = 'TOGGLE_CHECKOUT_BOTTOM_SHEET'
export const SET_STAFF_DATA = 'SET_STAFF_DATA'
export const SET_CUSTOMERS = 'SET_CUSTOMERS'
export const ADD_NEW_CUSTOMER = 'ADD_NEW_CUSTOMER'
export const POPULATE_ITEMS_IN_SALES = 'POPULATE_ITEMS_IN_SALES'
export const LOGOUT = 'LOGOUT'
export const POPULATE_REMOVED_ITEMS = 'POPULATE_REMOVED_ITEMS'
export const TOGGLE_SORTED_BY = 'TOGGLE_SORTED_BY'
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER'
export const POPULATE_DRAWER_ITEMS = 'POPULATE_DRAWER_ITEMS'

export const changeTab = tab => ({
  type: CHANGE_TAB,
  payload: tab
})

export const toggleAreYouSureModalVisibility = status => ({
  type: TOGGLE_ARE_YOU_SURE_MODAL_VISIBILTY,
  payload: status
})

export const toggleCheckOutBottomSheet = status => ({
  type: TOGGLE_CHECKOUT_BOTTOM_SHEET,
  payload: status
})

export const setStaffData = staffData => ({
  type: SET_STAFF_DATA,
  payload: { staffData }
})

export const setCustomers = customers => ({
  type: SET_CUSTOMERS,
  payload: customers
})

export const addNewCustomer = customer => ({
  type: ADD_NEW_CUSTOMER,
  payload: customer
})

export const populateItemsInSales = value => ({
  type: POPULATE_ITEMS_IN_SALES,
  payload: value
})

export const logOut = () => ({
  type: LOGOUT
})

export const populateRemovedItems = value => ({
  type: POPULATE_REMOVED_ITEMS,
  payload: value
})

export const toggleSortedBy = value => ({
  type: TOGGLE_SORTED_BY,
  payload: value
})

export const toggleDrawer = value => ({
  type: TOGGLE_DRAWER,
  payload: value
})

export const populateDrawerItems = value => ({
  type: POPULATE_DRAWER_ITEMS,
  payload: value
})


