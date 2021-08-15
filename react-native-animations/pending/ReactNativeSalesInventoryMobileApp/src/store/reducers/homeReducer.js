import * as Actions from "../actions";

const initialState = {
  areYouSureModalIsVisible: false,
  currentTab: "bar",
  checkBottomSheetIsVisible: false,
  staffData: {},
  staffSales: [],
  customers: [],
  sales: [],
  salesTotalAmount: 0,
  sortedBy: "defaultItems",
  isDrawerVisible: false,
  drawerItems: ["All"]
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.CHANGE_TAB: {
      return {
        ...state,
        currentTab: action.payload
      };
    }
    case Actions.TOGGLE_ARE_YOU_SURE_MODAL_VISIBILTY: {
      return {
        ...state,
        areYouSureModalIsVisible: action.payload
      };
    }
    case Actions.TOGGLE_CHECKOUT_BOTTOM_SHEET: {
      return {
        ...state,
        checkBottomSheetIsVisible: action.payload
      };
    }
    case Actions.SET_STAFF_DATA: {
      return {
        ...state,
        staffData: action.payload.staffData
      };
    }
    case Actions.SET_CUSTOMERS: {
      const newCustomers = action.payload.map(customer => {
        customer.customerName = customer.LastName;
        return customer;
      });
      const dummyCustomer = {
        Cust_ID: "Choose Customer",
        LastName: "Choose Customer",
        customerName: "Choose Customer"
      };
      newCustomers.unshift(dummyCustomer);
      return {
        ...state,
        customers: newCustomers
      };
    }
    case Actions.ADD_NEW_CUSTOMER: {
      const customers = state.customers;
      const newCustomer = action.payload;
      newCustomer.customerName = newCustomer.LastName;
      customers.push(newCustomer);
      return {
        ...state,
        customers: customers
      };
    }
    case Actions.POPULATE_ITEMS_IN_SALES: {
      const newSalesTotalAmount = action.payload.reduce(
        (total, obj) => +obj.transactionTotalAmount + total,
        0
      );
      return {
        ...state,
        sales: action.payload,
        salesTotalAmount: newSalesTotalAmount
      };
    }
    case Actions.TOGGLE_SORTED_BY: {
      return {
        ...state,
        sortedBy: action.payload
      };
    }
    case Actions.TOGGLE_DRAWER: {
      return {
        ...state,
        isDrawerVisible: action.payload
      };
    }
    case Actions.POPULATE_DRAWER_ITEMS: {
      const mItems = action.payload.reduce((acc, currentValue) => {
        acc.push(currentValue.Cat_Name);
        return acc;
      }, []);
      const nItems = state.drawerItems.concat(mItems);

      return {
        ...state,
        drawerItems: nItems
      };
    }
    default: {
      return state;
    }
  }
};

export default homeReducer;
