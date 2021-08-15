import * as Actions from "../actions";

import update from "react-addons-update";

const initialState = {
  totalNumberOfItemsAddedFromRestaurant: 0,
  totalAmountOfItemsAddedFromRestaurant: 0,
  restaurant: [],
  restaurantClone: [],
  restaurantCheckOut: [],
  isLoadingRestaurantItems: true,
};

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.UPDATE_NO_OF_ITEM_IN_RESTAURANT: {
      let itemIndex;
      const newRestaurant = state.restaurantClone.map((item, index) => {
        if (index === action.payload.index) {
          item.isPosted = false;
          item.noInCheckOut = Number(action.payload.value);
          item.newPrice = Number(action.payload.value) * Number(item.price);
          itemIndex = index;
        }
        return item;
      });

      const newRestaurantCheckOut = () => {
        return newRestaurant.filter((item) => item.noInCheckOut > 0);
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
            noInCheckOut: { $set: action.payload.value },
          },
        },
        restaurantClone: {
          [itemIndex]: {
            noInCheckOut: { $set: action.payload.value },
          },
        },
        totalNumberOfItemsAddedFromRestaurant: {
          $set: newTotalNumberOfItemsAddedFromRestaurant,
        },
        totalAmountOfItemsAddedFromRestaurant: {
          $set: newTotalAmountOfItemsAddedFromRestaurant,
        },
        restaurantCheckOut: { $set: newRestaurantCheckOut() },
      });
    }
    case Actions.CLEAR_ITEMS_IN_RESTAURANT: {
      const newRestaurant = state.restaurant.map((item, index) => {
        item.noInCheckOut = 0;
        return item;
      });

      const newRestaurantClone = state.restaurantClone.map((item, index) => {
        item.noInCheckOut = 0;
        return item;
      });

      return {
        restaurant: newRestaurant,
        restaurantClone: newRestaurantClone,
        totalNumberOfItemsAddedFromRestaurant: 0,
        totalAmountOfItemsAddedFromRestaurant: 0,
        restaurantCheckOut: [],
      };
    }
    case Actions.UPDATE_NO_OF_ITEM_FOR_RESTAURANT_CHECKOUT: {
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
        return newRestaurant.filter((item) => item.noInCheckOut > 0);
      };

      let newTotalNumberOfItemsAddedFromRestaurant = 0;
      let newTotalAmountOfItemsAddedFromRestaurant = 0;
      for (let anItem of newRestaurant) {
        const nINC = Number(anItem.noInCheckOut);
        newTotalNumberOfItemsAddedFromRestaurant += nINC;
        if (nINC > 0) {
          newTotalAmountOfItemsAddedFromRestaurant +=
            Number(anItem.price) * nINC;
        }
      }

      return update(state, {
        restaurant: {
          [itemIndex]: {
            noInCheckOut: { $set: action.payload.value },
          },
        },
        restaurantClone: {
          [itemIndex]: {
            noInCheckOut: { $set: action.payload.value },
          },
        },
        totalNumberOfItemsAddedFromRestaurant: {
          $set: newTotalNumberOfItemsAddedFromRestaurant,
        },
        totalAmountOfItemsAddedFromRestaurant: {
          $set: newTotalAmountOfItemsAddedFromRestaurant,
        },
        restaurantCheckOut: { $set: newRestaurantCheckOut() },
      });
    }
    case Actions.FILTER_ITEMS_IN_RESTAURANT: {
      let newRestaurant = [];
      if (action.payload.value) {
        newRestaurant = state.restaurantClone.filter((item) =>
          item.name.toLowerCase().includes(action.payload.value.toLowerCase())
        );
      } else {
        newRestaurant = state.restaurantClone;
      }

      return update(state, {
        restaurant: {
          $set: newRestaurant,
        },
      });
    }
    case Actions.POPULATE_ITEMS_IN_RESTAURANT: {
      return {
        ...state,
        restaurant: action.payload,
        restaurantClone: action.payload,
        isLoadingRestaurantItems: false,
      };
    }
    case Actions.TOGGLE_RESTAURANT_LOADING: {
      return {
        ...state,
        isLoadingRestaurantItems: action.payload,
      };
    }
    case Actions.REMOVE_PINNED_ITEM_IN_RESTAURANT: {
      const newRestaurant = state.restaurantClone.filter(
        (item, index) => item.itemId !== action.payload.itemId
      );
      return {
        ...state,
        restaurant: newRestaurant,
        restaurantClone: newRestaurant,
      };
    }
    case Actions.SORT_ITEMS_IN_RESTAURANT: {
      let newRestaurant = [],
        arrToBeSorted = action.payload,
        restaurantClone = state.restaurantClone;

      if (arrToBeSorted.length > 0) {
        const newRestaurantClone = restaurantClone.filter((item) => {
          if (!arrToBeSorted.find((arr) => arr.itemId.includes(item.itemId))) {
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
        restaurantClone: newRestaurant,
        isLoadingRestaurantItems: false,
      };
    }
    case Actions.FILTER_ITEMS_IN_RESTAURANT_BY_CATEGORY: {
      let newRestaurant = [];
      if (action.payload.value !== "All") {
        newRestaurant = state.restaurantClone.filter((item) => {
          return item.name
            .toLowerCase()
            .includes(action.payload.value.toLowerCase());
        });
      } else {
        newRestaurant = state.restaurantClone;
      }

      return update(state, {
        restaurant: {
          $set: newRestaurant,
        },
      });
    }
    default: {
      return state;
    }
  }
};

export default restaurantReducer;
