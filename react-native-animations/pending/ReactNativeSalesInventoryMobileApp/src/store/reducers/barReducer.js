import * as Actions from "../actions";
import update from "react-addons-update";

const initialState = {
  totalNumberOfItemsAddedFromBar: 0,
  totalAmountOfItemsAddedFromBar: 0,
  bar: [],
  barClone: [],
  barCheckOut: [],
  isLoadingBarItems: true,
};

const barReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.UPDATE_NO_OF_ITEM_IN_BAR: {
      let itemIndex;
      // state.barClone[action.payload.index].isPosted = false
      // state.barClone[action.payload.index].noInCheckOut = action.payload.value
      // state.barClone[action.payload.index].newPrice = Number(action.payload.value) * Number(state.barClone[action.payload.index].price)
      // itemIndex = action.payload.index

      const newBar = state.barClone.map((item, index) => {
        if (item.itemId === action.payload.itemId) {
          item.isPosted = false;
          item.noInCheckOut = Number(action.payload.value);
          item.newPrice = Number(action.payload.value) * Number(item.price);
          itemIndex = index;
        }

        return item;
      });

      const newBarCheckOut = () => {
        return newBar.filter((item) => item.noInCheckOut > 0);
      };

      let newTotalNumberOfItemsAddedFromBar = 0,
        newTotalAmountOfItemsAddedFromBar = 0;
      for (let anItem of state.barClone) {
        const nINC = Number(anItem.noInCheckOut);
        newTotalNumberOfItemsAddedFromBar += nINC;
        if (nINC > 0) {
          newTotalAmountOfItemsAddedFromBar += Number(anItem.price) * nINC;
        }
      }

      return update(state, {
        bar: {
          [action.payload.index]: {
            noInCheckOut: { $set: action.payload.value },
          },
        },
        barClone: {
          [itemIndex]: {
            noInCheckOut: { $set: action.payload.value },
          },
        },
        totalNumberOfItemsAddedFromBar: {
          $set: newTotalNumberOfItemsAddedFromBar,
        },
        totalAmountOfItemsAddedFromBar: {
          $set: newTotalAmountOfItemsAddedFromBar,
        },
        barCheckOut: { $set: newBarCheckOut() },
      });
    }

    case Actions.CLEAR_ITEMS_IN_BAR: {
      const newBar = state.bar.map((item, index) => {
        item.noInCheckOut = 0;
        return item;
      });

      const newBarClone = state.barClone.map((item, index) => {
        item.noInCheckOut = 0;
        return item;
      });

      return {
        bar: newBar,
        barClone: newBarClone,
        totalNumberOfItemsAddedFromBar: 0,
        totalAmountOfItemsAddedFromBar: 0,
        barCheckOut: [],
      };
    }
    case Actions.UPDATE_NO_OF_ITEM_FOR_BAR_CHECKOUT: {
      let itemIndex,
        newBarCheckOut = [],
        newTotalNumberOfItemsAddedFromBar = 0,
        newTotalAmountOfItemsAddedFromBar = 0;
      // state.barClone.forEach((item, index) => {
      //   if (item.itemId === action.payload.itemId) {
      //     itemIndex = index
      //   }
      // })

      const newBar = state.barClone.map((item, index) => {
        if (item.itemId === action.payload.itemId) {
          item.noInCheckOut = Number(action.payload.value);
          item.newPrice = Number(action.payload.value) * Number(item.price);
          itemIndex = index;
        }
        if (item.noInCheckOut > 0) {
          newBarCheckOut.push(item);
          const nINC = Number(item.noInCheckOut);
          newTotalNumberOfItemsAddedFromBar += nINC;
          newTotalAmountOfItemsAddedFromBar +=
            Number(item.price) * nINC;
        }
        return item;
      });

      return update(state, {
        bar: {
          $set: newBar,
        },
        barClone: {
          $set: newBar,
        },
        totalNumberOfItemsAddedFromBar: {
          $set: newTotalNumberOfItemsAddedFromBar,
        },
        totalAmountOfItemsAddedFromBar: {
          $set: newTotalAmountOfItemsAddedFromBar,
        },
        barCheckOut: { $set: newBarCheckOut },
      });
    }
    case Actions.FILTER_ITEMS_IN_BAR: {
      let newBar = [];
      if (action.payload.value) {
        newBar = state.barClone.filter((item) =>
          item.name.toLowerCase().includes(action.payload.value.toLowerCase())
        );
      } else {
        newBar = state.barClone;
      }

      return update(state, {
        bar: {
          $set: newBar,
        },
      });
    }
    case Actions.POPULATE_ITEMS_IN_BAR: {
      let payload = action.payload;

      return {
        ...state,
        bar: payload,
        barClone: payload,
        isLoadingBarItems: false,
      };
    }
    case Actions.TOGGLE_BAR_LOADING: {
      return {
        ...state,
        isLoadingBarItems: action.payload,
      };
    }
    case Actions.REMOVE_PINNED_ITEM_IN_BAR: {
      const newBar = state.barClone.filter(
        (item, index) => item.itemId !== action.payload.itemId
      );
      return {
        ...state,
        bar: newBar,
        barClone: newBar,
      };
    }
    case Actions.SORT_ITEMS_IN_BAR: {
      let newBar = [],
        arrToBeSorted = action.payload,
        barClone = state.barClone;

      if (arrToBeSorted.length > 0) {
        const newBarClone = barClone.filter((item) => {
          if (!arrToBeSorted.find((arr) => arr.itemId.includes(item.itemId))) {
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
        barClone: newBar,
        isLoadingBarItems: false,
      };
    }
    case Actions.FILTER_ITEMS_IN_BAR_BY_CATEGORY: {
      let newBar = [];
      if (action.payload.value !== "All") {
        newBar = state.barClone.filter((item) => {
          return item.Cat_Name.toLowerCase().includes(
            action.payload.value.toLowerCase()
          );
        });
      } else {
        newBar = state.barClone;
      }

      return {
        ...state,
        bar: newBar,
      };
    }
    default: {
      return state;
    }
  }
};

export default barReducer;
