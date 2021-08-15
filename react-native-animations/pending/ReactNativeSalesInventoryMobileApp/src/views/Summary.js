import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TextInput,
  AsyncStorage,
} from "react-native";
import { Header as NativeHeader } from "react-native-elements";
import { Content, DatePicker } from "native-base";
import { DataTable } from "react-native-paper";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import { debounce } from "../utils";
import { appUrl } from "../config";
import PopupMenu from "../components/PopupMenu";

export default function Summary({ route, navigation }) {
  const data = navigation?.state?.params?.params;
  const staffData = data?.staffData;
  const branches = data?.branches;
  let branchName = branches[0]["branchName"],
    requestPath = "getStoreInventory",
    limit = 20,
    offset = 0;

  const [state, setState] = useState({
    isLoading: true,
    isLoadingMore: false,
    activeSummary: "Store Inventory",
    requestPath,
    limit,
    offset,
    storeInventory: [],
    salesAnalysis: [],
    expensesHistory: [],
    searchCriteria: [],
    url: `${appUrl}/${requestPath}?branchName=${branchName}&limit=${limit}&offset=${offset}`,
    itemsToSearchBy: [
      { label: "Item Name", value: "Item_Name" },
      { label: "Category", value: "Cat_Name" },
    ],
    selectedSearchItem: {},
    searchText: "",
    branchesToSearchBy: [],
    customersToSearchBy: [],
    Cat_Name: "",
  });

  useEffect(() => {
    storeInventoryRequest();
  }, [state.url]);

  const onPopupEvent = async (eventName, index) => {
    let { activeSummary, requestPath, itemsToSearchBy } = state;
    if (index === 0) {
      activeSummary = "Store Inventory";
      requestPath = "getStoreInventory";
      itemsToSearchBy = [
        { label: "Item Name", value: "Item_Name" },
        { label: "Category", value: "Cat_Name" },
      ];
    } else if (index === 1) {
      activeSummary = "Sales Analysis";
      requestPath = "getSalesAnalysis";
      itemsToSearchBy = [{ label: "Item Name", value: "Item_Name" }];
    } else if (index === 2) {
      activeSummary = "Expenses History";
      requestPath = "getExpenses";
      itemsToSearchBy = [];
    } else if (index === 3) {
      await AsyncStorage.setItem("branches", "");
      await AsyncStorage.setItem("staffData", "");
      navigation?.replace("Login");
    }

    let limit = 20,
      offset = 0,
      url = `${appUrl}/${requestPath}?branchName=${branchName}&limit=${limit}&offset=${offset}`;

    console.log(url);

    setState({
      ...state,
      url,
      activeSummary,
      requestPath,
      offset,
      storeInventory: [],
      salesAnalysis: [],
      expensesHistory: [],
      isLoading: true,
      itemsToSearchBy,
      Cat_Name: "",
    });
  };

  const storeInventoryRequest = () => {
    const url = state.url;
    axios
      .get(url)
      .then(async (response) => {
        const activeSummary = state.activeSummary;
        const result = response.data;
        let {
          storeInventory,
          salesAnalysis,
          expensesHistory,
          offset,
          branchesToSearchBy,
          categoriesToSearchBy,
          customersToSearchBy,
          searchText,
        } = state;

        if (searchText) {
          storeInventory = [];
          salesAnalysis = [];
          expensesHistory = [];
        }

        if (result?.success) {
          const dataFound = result?.data?.payload;
          branchesToSearchBy = result?.data?.branches;
          offset = state.offset + (dataFound.length || 0);

          console.log("dataFound");
          console.log(result);

          branchesToSearchBy = branchesToSearchBy.reduce((acc, cur) => {
            let obj = {};
            obj["label"] = cur["branchName"];
            obj["value"] = cur["branchName"];
            acc.push(obj);
            return acc;
          }, []);

          if (activeSummary === "Store Inventory") {
            storeInventory = [...storeInventory, ...dataFound];
            categoriesToSearchBy = result?.data?.categories;
            categoriesToSearchBy = categoriesToSearchBy.reduce((acc, cur) => {
              if (cur?.Cat_Name) {
                let obj = {};
                obj["label"] = cur["Cat_Name"];
                obj["value"] = cur["Cat_Name"];
                acc.push(obj);
              }
              return acc;
            }, []);
          } else if (activeSummary === "Sales Analysis") {
            salesAnalysis = [...salesAnalysis, ...dataFound];
            customersToSearchBy = result?.data?.customers;
            customersToSearchBy = customersToSearchBy.reduce((acc, cur) => {
              if (cur?.Cust_ID) {
                let obj = {};
                obj["label"] = cur["LastName"];
                obj["value"] = cur["Cust_ID"];
                acc.push(obj);
              }
              return acc;
            }, []);
          } else if (activeSummary === "Expenses History") {
            expensesHistory = [...expensesHistory, ...dataFound];
          }
        }

        setState({
          ...state,
          isLoading: false,
          isLoadingMore: false,
          ...(offset && { offset }),
          ...(storeInventory && { storeInventory }),
          ...(salesAnalysis && { salesAnalysis }),
          ...(expensesHistory && { expensesHistory }),
          ...(branchesToSearchBy && { branchesToSearchBy }),
          ...(categoriesToSearchBy && { categoriesToSearchBy }),
          ...(customersToSearchBy && { customersToSearchBy }),
        });
      })
      .catch((err) => {
        console.log(err);
        setState({ ...state, isLoading: false, isLoadingMore: false });
      });
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const scrolledToBottom = () => {
    setState({ ...state, isLoadingMore: true });
    let limit = state.limit,
      offset = state.offset,
      requestPath = state.requestPath,
      url = `${appUrl}/${requestPath}?branchName=${branchName}&limit=${limit}&offset=${offset}`;
    storeInventoryRequest(url);
  };

  const convertToReadableDate = (dt) => {
    return new Date(dt).toDateString();
  };

  const handleChangeSearchBy = (tag, value) => {
    let {
      activeSummary,
      searchText,
      url,
      requestPath,
      limit,
      offset,
      Cat_Name,
    } = state;

    if (tag === "branchName") {
      branchName = value;
      url = `${appUrl}/${requestPath}?branchName=${branchName}&limit=${limit}&offset=${offset}${
        Cat_Name ? `&Cat_Name=${Cat_Name}` : ""
      }`;
    } else if (tag === "Cat_Name") {
      Cat_Name = value;
      url = `${appUrl}/${requestPath}?branchName=${branchName}&limit=${limit}&offset=${offset}&Cat_Name=${Cat_Name}`;
    }

    if (searchText) {
      url = `${url}&Item_Name=${searchText}`;
    }

    setState({
      ...state,
      ...(searchText && {
        url,
        // storeInventory: [],
        // salesAnalysis: [],
        // expensesHistory: [],
        isLoading: true,
      }),
      Cat_Name,
    });
  };

  const handleSearchFilter = (searchText) => {
    let { activeSummary, url, requestPath, limit, offset, Cat_Name } = state;

    url = `${appUrl}/${requestPath}?branchName=${branchName}&limit=${limit}&offset=${offset}${
      Cat_Name ? `&Cat_Name=${Cat_Name}` : ""
    }`;

    if (searchText) {
      url = `${url}&Item_Name=${searchText}`;
    }

    console.log(url);

    setState({
      ...state,
      url,
      storeInventory: [],
      // salesAnalysis: [],
      // expensesHistory: [],
      isLoading: true,
      searchText,
    });
  };

  const searchTask = (text) => {
    let searchText = text?.trim();

    if (searchText) {
      debounce(handleSearchFilter(searchText), 1000);
    }
  };

  return (
    <View style={styles.layoutContainer}>
      <NativeHeader
        leftComponent={<Text style={{ display: "none" }}>leftComponent</Text>}
        centerComponent={
          <View style={styles.centerWrapper}>
            <Text style={styles.centerText}>{state.activeSummary}</Text>
          </View>
        }
        rightComponent={
          <View style={styles.rightWrapper}>
            <PopupMenu
              actions={[
                "Store Inventory",
                "Sales Analysis",
                "Expenses History",
                "Logout",
              ]}
              onPress={onPopupEvent}
            />
          </View>
        }
        containerStyle={{
          backgroundColor: "#2e88ce",
          justifyContent: "space-around",
        }}
      />
      <View style={styles.contentWrapper}>
        {state.isLoading ? (
          <View style={styles.emptyContainer}>
            <ActivityIndicator size="large" color="#2e88ce" />
          </View>
        ) : (
          <>
            <View style={styles.searchLayout}>
              <View style={styles.searchWrapper}>
                <TextInput
                  placeholder="Search"
                  value={state.searchText}
                  onChangeText={(text) => searchTask(text)}
                  style={styles.searchInput}
                />
              </View>
            </View>
            {state.activeSummary === "Store Inventory" ? (
              <>
                <View style={styles.searchByContainer}>
                  {state.branchesToSearchBy.length ? (
                    <View
                      style={{
                        width: "45%",
                        marginBottom: 20,
                      }}
                    >
                      <DropDownPicker
                        placeholder="Branches"
                        placeholderStyle={{ color: "#ccc" }}
                        items={state.branchesToSearchBy}
                        // defaultValue={state.searchByText}
                        containerStyle={{ height: 35 }}
                        style={{ backgroundColor: "#fafafa" }}
                        itemStyle={{
                          justifyContent: "flex-start",
                          color: "gray",
                        }}
                        dropDownStyle={{
                          backgroundColor: "#fafafa",
                        }}
                        onChangeItem={(item) =>
                          handleChangeSearchBy("branchName", item?.value)
                        }
                        selectedLabelStyle={{ color: "#000" }}
                        labelStyle={{
                          color: "gray",
                        }}
                      />
                    </View>
                  ) : null}
                  {state.categoriesToSearchBy.length ? (
                    <View
                      style={{
                        width: "45%",
                        marginBottom: 20,
                      }}
                    >
                      <DropDownPicker
                        placeholder="Categories"
                        placeholderStyle={{ color: "#ccc" }}
                        items={state.categoriesToSearchBy}
                        // defaultValue={state.searchByText}
                        containerStyle={{ height: 35 }}
                        style={{ backgroundColor: "#fafafa" }}
                        itemStyle={{
                          justifyContent: "flex-start",
                          color: "gray",
                        }}
                        dropDownStyle={{
                          backgroundColor: "#fafafa",
                        }}
                        onChangeItem={(item) =>
                          handleChangeSearchBy("Cat_Name", item?.value)
                        }
                        selectedLabelStyle={{ color: "#000" }}
                        labelStyle={{
                          color: "gray",
                        }}
                      />
                    </View>
                  ) : null}
                </View>
                <View style={styles.tableWrapper}>
                  <DataTable>
                    <ScrollView horizontal>
                      <View>
                        <DataTable.Header>
                          <DataTable.Title style={styles.serialNumberCell}>
                            S/N
                          </DataTable.Title>
                          <DataTable.Title style={styles.singleCell}>
                            Item Code
                          </DataTable.Title>
                          <DataTable.Title style={styles.singleCell}>
                            Item Name
                          </DataTable.Title>
                          <DataTable.Title style={styles.singleCell}>
                            Quantity
                          </DataTable.Title>
                          <DataTable.Title style={styles.singleCell}>
                            Category Name
                          </DataTable.Title>
                          <DataTable.Title style={styles.singleCell}>
                            Product Name
                          </DataTable.Title>
                          <DataTable.Title style={styles.singleCell}>
                            Unit Cost
                          </DataTable.Title>
                          <DataTable.Title style={styles.singleCell}>
                            Unit Price(R/S)
                          </DataTable.Title>
                          <DataTable.Title style={styles.singleCell}>
                            Unit Price(WP)
                          </DataTable.Title>
                          <DataTable.Title style={styles.singleCell}>
                            Unit Price(DP)
                          </DataTable.Title>
                          <DataTable.Title style={styles.singleCell}>
                            Total Value Available
                          </DataTable.Title>
                        </DataTable.Header>
                        {state.storeInventory.length ? (
                          <ScrollView
                            showsVerticalScrollIndicator={false}
                            onScroll={({ nativeEvent }) => {
                              if (isCloseToBottom(nativeEvent)) {
                                scrolledToBottom();
                              }
                            }}
                            vertical={true}
                          >
                            {state.storeInventory.map((inventory, index) => {
                              return (
                                <DataTable.Row key={index}>
                                  <DataTable.Cell
                                    style={styles.serialNumberCell}
                                  >
                                    {index + 1}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.singleCell}>
                                    {inventory?.Bar_Code}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.singleCell}>
                                    {inventory?.Item_Name}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.singleCell}>
                                    {inventory?.Quantity}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.singleCell}>
                                    {inventory?.Cat_Name}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.singleCell}>
                                    {inventory?.Item_Name}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.singleCell}>
                                    {inventory?.UnitCost}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.singleCell}>
                                    {inventory?.UnitPrice}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.singleCell}>
                                    {inventory?.UnitPrice}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.singleCell}>
                                    {inventory?.UnitPrice}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.singleCell}>
                                    {48500}
                                  </DataTable.Cell>
                                </DataTable.Row>
                              );
                            })}
                          </ScrollView>
                        ) : null}
                      </View>
                    </ScrollView>
                  </DataTable>
                </View>
              </>
            ) : state.activeSummary === "Sales Analysis" ? (
              <>
                {state.branchesToSearchBy.length ? (
                  <View
                    style={{
                      width: "45%",
                      marginBottom: 20,
                    }}
                  >
                    <DropDownPicker
                      placeholder="Branches"
                      placeholderStyle={{ color: "#ccc" }}
                      items={state.branchesToSearchBy}
                      // defaultValue={state.searchByText}
                      containerStyle={{ height: 35 }}
                      style={{ backgroundColor: "#fafafa" }}
                      itemStyle={{
                        justifyContent: "flex-start",
                        color: "gray",
                      }}
                      dropDownStyle={{
                        backgroundColor: "#fafafa",
                      }}
                      onChangeItem={(item) =>
                        handleChangeSearchBy("branchName", item?.value)
                      }
                      selectedLabelStyle={{ color: "#000" }}
                      labelStyle={{
                        color: "gray",
                      }}
                    />
                  </View>
                ) : null}
                <View style={styles.tableWrapper}>
                  <DataTable>
                    <ScrollView horizontal>
                      <View>
                        <DataTable.Header>
                          <DataTable.Title style={styles.serialNumberCell}>
                            S/N
                          </DataTable.Title>
                          <DataTable.Title style={styles.singleCell}>
                            Model Number
                          </DataTable.Title>
                          <DataTable.Title style={styles.singleCell}>
                            Item Name
                          </DataTable.Title>
                          <DataTable.Title style={styles.singleCell}>
                            Quantity
                          </DataTable.Title>
                          <DataTable.Title style={styles.singleCell}>
                            Price Sold
                          </DataTable.Title>
                          <DataTable.Title style={styles.singleCell}>
                            Unit Cost
                          </DataTable.Title>
                          <DataTable.Title style={styles.singleCell}>
                            Profit
                          </DataTable.Title>
                          <DataTable.Title style={styles.singleCell}>
                            Sales Date
                          </DataTable.Title>
                        </DataTable.Header>
                        {state.salesAnalysis.length ? (
                          <ScrollView
                            showsVerticalScrollIndicator={false}
                            onScroll={({ nativeEvent }) => {
                              if (isCloseToBottom(nativeEvent)) {
                                scrolledToBottom();
                              }
                            }}
                            vertical={true}
                          >
                            {state.salesAnalysis.map((analysis, index) => {
                              return (
                                <DataTable.Row key={index}>
                                  <DataTable.Cell
                                    style={styles.serialNumberCell}
                                  >
                                    {index + 1}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.singleCell}>
                                    {analysis?.Bar_Code}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.singleCell}>
                                    {analysis?.Item_Name}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.singleCell}>
                                    {analysis?.QTY}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.singleCell}>
                                    {analysis?.PriceSold}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.singleCell}>
                                    {analysis?.UnitCost}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.singleCell}>
                                    {analysis?.Profit}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.singleCell}>
                                    {convertToReadableDate(analysis?.Date_Log)}
                                  </DataTable.Cell>
                                </DataTable.Row>
                              );
                            })}
                          </ScrollView>
                        ) : null}
                      </View>
                    </ScrollView>
                  </DataTable>
                </View>
              </>
            ) : state.activeSummary === "Expenses History" ? (
              <>
                {state.branchesToSearchBy.length ? (
                  <View
                    style={{
                      width: "45%",
                      marginBottom: 20,
                    }}
                  >
                    <DropDownPicker
                      placeholder="Branches"
                      placeholderStyle={{ color: "#ccc" }}
                      items={state.branchesToSearchBy}
                      // defaultValue={state.searchByText}
                      containerStyle={{ height: 35 }}
                      style={{ backgroundColor: "#fafafa" }}
                      itemStyle={{
                        justifyContent: "flex-start",
                        color: "gray",
                      }}
                      dropDownStyle={{
                        backgroundColor: "#fafafa",
                      }}
                      onChangeItem={(item) =>
                        handleChangeSearchBy("branchName", item?.value)
                      }
                      selectedLabelStyle={{ color: "#000" }}
                      labelStyle={{
                        color: "gray",
                      }}
                    />
                  </View>
                ) : null}
                <View style={styles.tableWrapper}>
                  <DataTable>
                    <ScrollView horizontal>
                      <View>
                        <DataTable.Header>
                          <DataTable.Title style={styles.serialNumberCell}>
                            S/N
                          </DataTable.Title>
                          <DataTable.Title style={styles.singleCell}>
                            Exp Header
                          </DataTable.Title>
                          <DataTable.Title style={styles.singleCell}>
                            Requester Name
                          </DataTable.Title>
                          <DataTable.Title style={styles.singleCell}>
                            Department
                          </DataTable.Title>
                          <DataTable.Title style={styles.singleCell}>
                            Amount
                          </DataTable.Title>
                          <DataTable.Title style={styles.wideCell}>
                            Purpose
                          </DataTable.Title>
                          <DataTable.Title style={styles.singleCell}>
                            Exp Date
                          </DataTable.Title>
                          <DataTable.Title style={styles.singleCell}>
                            Exp ID
                          </DataTable.Title>
                          <DataTable.Title style={styles.singleCell}>
                            Username
                          </DataTable.Title>
                        </DataTable.Header>
                        {state.expensesHistory.length ? (
                          <ScrollView
                            showsVerticalScrollIndicator={false}
                            onScroll={({ nativeEvent }) => {
                              if (isCloseToBottom(nativeEvent)) {
                                scrolledToBottom();
                              }
                            }}
                            vertical={true}
                          >
                            {state.expensesHistory.map((expenses, index) => {
                              return (
                                <DataTable.Row key={index}>
                                  <DataTable.Cell
                                    style={styles.serialNumberCell}
                                  >
                                    {index + 1}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.singleCell}>
                                    {expenses?.Header}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.singleCell}>
                                    {expenses?.ReqName}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.singleCell}>
                                    {expenses?.Department}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.singleCell}>
                                    {expenses?.Amount}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.wideCell}>
                                    {expenses?.Purpose}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.singleCell}>
                                    {convertToReadableDate(expenses?.ReqDate)}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.singleCell}>
                                    {expenses?.ExpID}
                                  </DataTable.Cell>
                                  <DataTable.Cell style={styles.singleCell}>
                                    {expenses?.username}
                                  </DataTable.Cell>
                                </DataTable.Row>
                              );
                            })}
                          </ScrollView>
                        ) : null}
                      </View>
                    </ScrollView>
                  </DataTable>
                </View>
              </>
            ) : null}
            {state.isLoadingMore ? (
              <View style={styles.loadingWrapper}>
                <ActivityIndicator size="large" color="#2e88ce" styl />
                <Text style={styles.loadingMoreText}>Loading more...</Text>
              </View>
            ) : null}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    backgroundColor: "#eee",
  },
  contentWrapper: {
    padding: 16,
    height: "100%",
  },
  emptyContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  tableWrapper: {
    maxHeight: "68%",
  },
  rightWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  centerWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 40,
  },
  centerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  serialNumberCell: {
    width: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  singleCell: {
    width: 110,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  wideCell: {
    width: 150,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  loadingWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 7,
  },
  loadingMoreText: {
    opacity: 0.5,
    fontSize: 13,
  },
  searchByContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  searchLayout: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 15,
    height: 40,
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  searchWrapper: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  searchInput: {
    width: "100%",
  },
});
