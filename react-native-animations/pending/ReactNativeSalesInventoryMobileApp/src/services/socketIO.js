import socketIOClient from "socket.io-client";
import { appUrl } from "../config";
import * as actions from "../store/actions";
import { AsyncStorage } from "react-native";

export const socket = socketIOClient(appUrl, {
  transports: ["websocket"],
  jsonp: false
});

export const socketIO = store => {
  socket.connect();

  socket.on("connect", () => {
    console.log("connected to server.");

    (async function() {
      await AsyncStorage.getItem("staffData").then(value => {
        if (value) {
          const { Staff_ID, Branch } = JSON.parse(value);

          socket.emit("saveSocketId", Staff_ID);

          socket.on("transactionDetailsUpdated", data => {
            if (data.Staff_ID === Staff_ID) {
              store.dispatch(actions.updateOngoingTransactionInCart(data));
            }
          });

          socket.on("itemRemoved", data => {
            if (data.Staff_ID === Staff_ID) {
              store.dispatch(actions.removeItemFromOngoingTransactionInCart(data));
            }
          });

          socket.on("inventoryUpdated", () => {
            socket.emit("getItems", Branch, response => {
              if (response) {
                let { barItems, restaurantItems } = response;

                store.dispatch(
                  actions.populateItemsInRestaurant(restaurantItems)
                );
                store.dispatch(
                  actions.populateMoreItemsInRestaurant(restaurantItems)
                );

                store.dispatch(actions.populateItemsInBar(barItems));
                store.dispatch(actions.populateMoreItemsInBar(barItems));
              }
            });
          });

          socket.on("salesClosed", data => {
            if (data === Branch) {
              store.dispatch(
                actions.removeAllItemsFromOngoingTransactionsInCart()
              );
            }
          });
        }
      });
    })();

    socket.on("disconnect", () => {
      console.log("connection to server lost.");
    });

    socket.on("newCustomersAdded", data => {
      store.dispatch(actions.addNewCustomer(data));
    });

    // socket.on("updateItems", data => {
    //   if (data) {
    //     let { items, items2 } = data;
    //     store.dispatch(actions.populateItemsInRestaurant(items2));
    //     store.dispatch(actions.populateMoreItemsInRestaurant(items2));

    //     store.dispatch(actions.populateItemsInBar(items));
    //     store.dispatch(actions.populateMoreItemsInBar(items));
    //   }
    // });
  });
};
