export const UPDATE_NO_OF_ITEM_IN_CART = "UPDATE_NO_OF_ITEM_IN_CART";
export const FILTER_TRANSACTIONS_IN_CART = "FILTER_TRANSACTIONS_IN_CART";
export const ADD_NEW_DATA_TO_CART = "ADD_NEW_DATA_TO_CART";
export const CANCEL_TRANSACTION_IN_CART = "CANCEL_TRANSACTION_IN_CART";
export const POPULATE_ONGOING_TRANSACTIONS_IN_CART =
  "POPULATE_ONGOING_TRANSACTIONS_IN_CART";
export const ADD_MORE_TO_CART = "ADD_MORE_TO_CART";
export const UPDATE_ONGOING_TRANSACTION_IN_CART =
  "UPDATE_ONGOING_TRANSACTION_IN_CART";
export const REMOVE_ITEM_FROM_ONGOING_TRANSACTION_IN_CART =
  "REMOVE_ITEM_FROM_ONGOING_TRANSACTION_IN_CART";
export const REMOVE_ALL_ITEMS_FROM_ONGOING_TRANSACTIONS_IN_CART =
  "REMOVE_ALL_ITEMS_FROM_ONGOING_TRANSACTIONS_IN_CART";
export const REMOVE_SINGLE_ITEM_FROM_ONGOING_TRANSACTIONS_IN_CART =
  "REMOVE_SINGLE_ITEM_FROM_ONGOING_TRANSACTIONS_IN_CART";
export const TOGGLE_CART_LOADING = 'TOGGLE_CART_LOADING';


export const updateNoOfItemInCart = (
  transactionId,
  itemId,
  index,
  value,
  subIndex
) => ({
  type: UPDATE_NO_OF_ITEM_IN_CART,
  payload: { transactionId, itemId, index, value, subIndex }
});

export const filterTransactionsInCart = value => ({
  type: FILTER_TRANSACTIONS_IN_CART,
  payload: { value }
});

export const addNewDataToCart = newItemsInCart => ({
  type: ADD_NEW_DATA_TO_CART,
  payload: newItemsInCart
});

export const cancelTransactionInCart = transactionId => ({
  type: CANCEL_TRANSACTION_IN_CART,
  payload: { transactionId }
});

export const populateOngoingTransactionsInCart = transactions => ({
  type: POPULATE_ONGOING_TRANSACTIONS_IN_CART,
  payload: transactions
});

export const addMoreToCart = (
  transactionId,
  barCheckOut,
  restaurantCheckOut
) => ({
  type: ADD_MORE_TO_CART,
  payload: { transactionId, barCheckOut, restaurantCheckOut }
});

export const updateOngoingTransactionInCart = transaction => ({
  type: UPDATE_ONGOING_TRANSACTION_IN_CART,
  payload: transaction
});

export const removeItemFromOngoingTransactionInCart = transaction => ({
  type: REMOVE_ITEM_FROM_ONGOING_TRANSACTION_IN_CART,
  payload: transaction
});

export const removeAllItemsFromOngoingTransactionsInCart = () => ({
  type: REMOVE_ALL_ITEMS_FROM_ONGOING_TRANSACTIONS_IN_CART
});

export const removeSingleItemFromOngoingTransactionsInCart = transactionId => ({
  type: REMOVE_SINGLE_ITEM_FROM_ONGOING_TRANSACTIONS_IN_CART,
  payload: transactionId
});

export const toggleCartItemsLoading = value => ({
  type: TOGGLE_CART_LOADING,
  payload: value
})
