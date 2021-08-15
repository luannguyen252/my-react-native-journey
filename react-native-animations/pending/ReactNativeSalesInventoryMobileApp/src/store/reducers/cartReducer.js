import * as Actions from "../actions";
import update from "react-addons-update";

const initialState = {
  itemsInCart: [],
  itemsInCartClone: [],
  selectedItem: [],
  isLoadingCartItems: true
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.UPDATE_NO_OF_ITEM_IN_CART: {
      return update(state, {
        itemsInCart: {
          [action.payload.index]: {
            transactionDetails: {
              [action.payload.subIndex]: {
                noInCheckOut: { $set: action.payload.value }
              }
            }
          }
        }
      });
    }
    case Actions.FILTER_TRANSACTIONS_IN_CART: {
      let newItemsInCart = [];
      if (action.payload.value) {
        newItemsInCart = state.itemsInCartClone.filter(
          item =>
            item.tableNumber.includes(action.payload.value.toString()) ||
            item.transactionId.startsWith(action.payload.value.toString())
        );
      } else {
        newItemsInCart = state.itemsInCartClone;
      }
      return update(state, {
        itemsInCart: {
          $set: newItemsInCart
        }
      });
    }
    case Actions.ADD_NEW_DATA_TO_CART: {
      const arr = [action.payload];
      const newItemsInCart = arr.concat(state.itemsInCartClone);
      return update(state, {
        itemsInCart: {
          $set: newItemsInCart
        },
        itemsInCartClone: {
          $set: newItemsInCart
        }
      });
    }
    case Actions.CANCEL_TRANSACTION_IN_CART: {
      const newItemsInCart = state.itemsInCartClone.filter(
        item => item.transactionId !== action.payload.transactionId
      );
      return update(state, {
        itemsInCart: {
          $set: newItemsInCart
        },
        itemsInCartClone: {
          $set: newItemsInCart
        }
      });
    }
    case Actions.POPULATE_ONGOING_TRANSACTIONS_IN_CART: {
      const newItemsInCart = action.payload.map(ongoingTransaction => {
        ongoingTransaction.transactionDetails = JSON.parse(
          ongoingTransaction.transactionDetails
        );
        return ongoingTransaction;
      });
      return update(state, {
        itemsInCart: {
          $set: newItemsInCart
        },
        itemsInCartClone: {
          $set: newItemsInCart
        },
        isLoadingCartItems: {
          $set: false
        }
      });
    }
    case Actions.ADD_MORE_TO_CART: {
      const transactionId = action.payload.transactionId;
      const barCheckOut = action.payload.barCheckOut;
      const restaurantCheckOut = action.payload.restaurantCheckOut;
      let newTransactionTotalNumber = 0, newTransactionTotalAmount = 0;

      for (let anItem of barCheckOut) {
        newTransactionTotalNumber += Number(anItem.noInCheckOut);
        if (anItem.noInCheckOut > 0) {
          newTransactionTotalAmount +=
            Number(anItem.price) * Number(anItem.noInCheckOut);
        }
      }

      for (let anItem of restaurantCheckOut) {
        newTransactionTotalNumber += Number(anItem.noInCheckOut);
        if (anItem.noInCheckOut > 0) {
          newTransactionTotalAmount +=
            Number(anItem.price) * Number(anItem.noInCheckOut);
        }
      }

      const newTransaction = {
        barCheckOut: barCheckOut,
        restaurantCheckOut: restaurantCheckOut
      };
      let selectedItem = [];
      const newItemsInCart = state.itemsInCartClone.map(item => {
        if (item.transactionId === transactionId) {
          item.transactionTotalNumber =
            Number(item.transactionTotalNumber) + newTransactionTotalNumber;
          item.transactionTotalAmount =
            Number(item.transactionTotalAmount) + newTransactionTotalAmount;
          item.transactionDetails.push(newTransaction);
          selectedItem = item;
        }
        return item;
      });
      return update(state, {
        itemsInCart: {
          $set: newItemsInCart
        },
        itemsInCartClone: {
          $set: newItemsInCart
        },
        selectedItem: {
          $set: selectedItem
        }
      });
    }
    case Actions.UPDATE_ONGOING_TRANSACTION_IN_CART: {
      const newItemsInCart = state.itemsInCartClone.map(transaction => {
        if (transaction.transactionId === action.payload.transactionId) {
          transaction = action.payload
          // const transactionDetails = transaction.transactionDetails;
          // let Branch = transaction.Branch;
          // if (Branch == "Old Bar" || Branch == "New Bar") {
          //   transactionDetails.map(transactionDetail => {
          //     const barCheckOut = transactionDetail.barCheckOut;
          //     barCheckOut.map(b => {
          //       b.isPosted = true;
          //       return b;
          //     });
          //     return transactionDetail;
          //   });
          // } else {
          //   transactionDetails.map(transactionDetail => {
          //     const restaurantCheckOut = transactionDetail.restaurantCheckOut;
          //     restaurantCheckOut.map(b => {
          //       b.isPosted = true;
          //       return b;
          //     });
          //     return transactionDetail;
          //   });
          // }
        }
        return transaction;
      });
      return update(state, {
        itemsInCart: {
          $set: newItemsInCart
        },
        itemsInCartClone: {
          $set: newItemsInCart
        }
      });
    }
    case Actions.REMOVE_ITEM_FROM_ONGOING_TRANSACTION_IN_CART: {
      const {
        itemIndex,
        outlet,
        checkOutIndex,
        newPrice,
        noInCheckOut,
        transactionId,
        Staff_ID,
        transactionDetails,
        transactionTotalAmount,
        transactionTotalNumber
      } = action.payload;
      const newItemsInCart = state.itemsInCartClone.map(transaction => {
        if (transaction.transactionId === transactionId) {
          transaction.transactionTotalNumber = transactionTotalNumber;
          transaction.transactionTotalAmount = transactionTotalAmount;
          transaction.transactionDetails = transactionDetails;
        }
        return transaction;
      });
      return update(state, {
        itemsInCart: {
          $set: newItemsInCart
        },
        itemsInCartClone: {
          $set: newItemsInCart
        }
      });
    }
    case Actions.REMOVE_ALL_ITEMS_FROM_ONGOING_TRANSACTIONS_IN_CART: {
      return update(state, {
        itemsInCart: {
          $set: []
        },
        itemsInCartClone: {
          $set: []
        }
      });
    }
    case Actions.REMOVE_SINGLE_ITEM_FROM_ONGOING_TRANSACTIONS_IN_CART: {
      const newItemsInCart = state.itemsInCartClone.filter(
        item => item.transactionId !== action.payload
      );
      return update(state, {
        itemsInCart: {
          $set: newItemsInCart
        },
        itemsInCartClone: {
          $set: newItemsInCart
        }
      });
    }    
    case Actions.TOGGLE_CART_LOADING: {
      return {
        ...state,
        isLoadingCartItems: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default cartReducer;
