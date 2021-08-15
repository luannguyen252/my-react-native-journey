import * as Actions from "../actions";
import update from "react-addons-update";

const initialState = {
  bar: [],
  barClone: [],
  barCheckOut: [],
  restaurant: [],
  restaurantClone: [],
  restaurantCheckOut: [],
  selectedOrderTransactionId: ""
};

const moreItemsToOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.UPDATE_NO_OF_ITEM_IN_MORE_BAR: {
      let itemIndex;

      // state.barClone[action.payload.index].noInCheckOut = action.payload.value
      // state.barClone[action.payload.index].newPrice = Number(action.payload.value) * Number(state.barClone[action.payload.index].price)

      const newBar = state.barClone.map((item, index) => {
        if (item.itemId === action.payload.itemId) {
          item.noInCheckOut = Number(action.payload.value);
          item.newPrice = Number(action.payload.value) * Number(item.price);
          itemIndex = index;
        }

        return item;
      });

      const newBarCheckOut = () => {
        return newBar.filter(item => item.noInCheckOut > 0);
      };

      let newTotalNumberOfItemsAddedFromBar = 0,
        newTotalAmountOfItemsAddedFromBar = 0;

      for (let anItem of state.barClone) {
        const nINC = Number(anItem.noInCheckOut);
        newTotalNumberOfItemsAddedFromBar += nINC;
        if (nINC > 0) {
          newTotalAmountOfItemsAddedFromBar +=
            Number(anItem.price) * nINC;
        }
      }

      return update(state, {
        bar: {
          [action.payload.index]: {
            noInCheckOut: { $set: action.payload.value }
          }
        },
        barClone: {
          [itemIndex]: {
            noInCheckOut: { $set: action.payload.value }
          }
        },
        totalNumberOfItemsAddedFromBar: {
          $set: newTotalNumberOfItemsAddedFromBar
        },
        totalAmountOfItemsAddedFromBar: {
          $set: newTotalAmountOfItemsAddedFromBar
        },
        barCheckOut: { $set: newBarCheckOut() }
      });
    }
    case Actions.CLEAR_ITEMS_IN_MORE_BAR: {
      // const newBar = state.bar.map((item, index) => {
      //   item.noInCheckOut = 0;
      //   return item;
      // });

      const newBar = state.barClone.map((item, index) => {
        item.noInCheckOut = 0;
        return item;
      });

      return {
        ...state,
        bar: newBar,
        barClone: newBar,
        totalNumberOfItemsAddedFromBar: 0,
        totalAmountOfItemsAddedFromBar: 0,
        barCheckOut: []
      };
    }
    case Actions.UPDATE_NO_OF_ITEM_IN_MORE_RESTAURANT: {
      let itemIndex;

      const newRestaurant = state.restaurantClone.map((item, index) => {
        if (item.itemId === action.payload.itemId) {
          item.noInCheckOut = Number(action.payload.value);
          item.newPrice = Number(action.payload.value) * Number(item.price);
          itemIndex = index;
        }

        return item;
      });

      const newRestaurantCheckOut = () => {
        return newRestaurant.filter(item => item.noInCheckOut > 0);
      };

      let newTotalNumberOfItemsAddedFromRestaurant = 0,
        newTotalAmountOfItemsAddedFromRestaurant = 0;

      for (let anItem of state.restaurantClone) {
        const nINC = Number(anItem.noInCheckOut);
        newTotalNumberOfItemsAddedFromRestaurant += nINC;
        if (nINC > 0) {
          newTotalAmountOfItemsAddedFromRestaurant +=
            Number(anItem.price) * nINC;
        }
      }

      return update(state, {
        restaurant: {
          [action.payload.index]: {
            noInCheckOut: { $set: action.payload.value }
          }
        },
        restaurantClone: {
          [itemIndex]: {
            noInCheckOut: { $set: action.payload.value }
          }
        },
        totalNumberOfItemsAddedFromRestaurant: {
          $set: newTotalNumberOfItemsAddedFromRestaurant
        },
        totalAmountOfItemsAddedFromRestaurant: {
          $set: newTotalAmountOfItemsAddedFromRestaurant
        },
        restaurantCheckOut: { $set: newRestaurantCheckOut() }
      });
    }
    case Actions.CLEAR_ITEMS_IN_MORE_RESTAURANT: {
      const newRestaurant = state.restaurant.map(item => {
        item.noInCheckOut = 0;
        return item;
      });

      const newRestaurantClone = state.restaurantClone.map((item, index) => {
        item.noInCheckOut = 0;
        return item;
      });

      return {
        ...state,
        restaurant: newRestaurant,
        restaurantClone: newRestaurantClone,
        totalNumberOfItemsAddedFromRestaurant: 0,
        totalAmountOfItemsAddedFromRestaurant: 0,
        restaurantCheckOut: []
      };
    }
    case Actions.CHANGE_SELECTED_ORDER_TRANSACTION_ID: {
      return {
        ...state,
        selectedOrderTransactionId: action.payload
      };
    }
    case Actions.POPULATE_ITEMS_IN_MORE_BAR: {
      return {
        ...state,
        bar: action.payload,
        barClone: action.payload
      };
    }
    case Actions.POPULATE_ITEMS_IN_MORE_RESTAURANT: {
      return {
        ...state,
        restaurant: action.payload,
        restaurantClone: action.payload
      };
    }
    case Actions.FILTER_ITEMS_IN_MORE_BAR: {
      let newbar = [];
      if (action.payload.value) {
        newbar = state.barClone.filter(item =>
          item.name.toLowerCase().includes(action.payload.value.toLowerCase())
        );
      } else {
        newbar = state.barClone;
      }

      return update(state, {
        bar: {
          $set: newbar
        }
      });
    }
    case Actions.FILTER_ITEMS_IN_MORE_RESTAURANT: {
      let newRestaurant = [];
      if (action.payload.value) {
        newRestaurant = state.restaurantClone.filter(item =>
          item.name.toLowerCase().includes(action.payload.value.toLowerCase())
        );
      } else {
        newRestaurant = state.restaurantClone;
      }

      return update(state, {
        restaurant: {
          $set: newRestaurant
        }
      });
    }
    case Actions.SORT_ITEMS_IN_MORE_BAR: {
      let newBar = [],
        arrToBeSorted = action.payload,
        barClone = state.barClone;

      if (arrToBeSorted.length > 0) {
        const newBarClone = barClone.filter(item => {
          if (!arrToBeSorted.find(arr => arr.itemId.includes(item.itemId))) {
            return item;
          }
        });
        newBar = arrToBeSorted.concat(newBarClone);
      } else {
        newBar = state.barClone;
      }

      return {
        ...state,
        bar: newBar,
        barClone: newBar
      };
    }
    case Actions.SORT_ITEMS_IN_MORE_RESTAURANT: {
      let newRestaurant = [],
        arrToBeSorted = action.payload,
        restaurantClone = state.restaurantClone;

      if (arrToBeSorted.length > 0) {
        const newRestaurantClone = restaurantClone.filter(item => {
          if (!arrToBeSorted.find(arr => arr.itemId.includes(item.itemId))) {
            return item;
          }
        });
        newRestaurant = arrToBeSorted.concat(newRestaurantClone);
      } else {
        newRestaurant = state.restaurantClone;
      }

      return {
        ...state,
        restaurant: newRestaurant,
        restaurantClone: newRestaurant
      }
    }
    default: {
      return state;
    }
  }
};

export default moreItemsToOrderReducer;
