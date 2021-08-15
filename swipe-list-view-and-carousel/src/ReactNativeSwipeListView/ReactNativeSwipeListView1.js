import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  SafeAreaView,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

export default function ReactNativeSwipeListView1() {
  // BEGIN: Declare list data
  const [listData, setListData] = useState(
    Array(5)
      .fill("")
      .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
  );
  // END: Declare list data

  // BEGIN: Declare pin cell data function
  const pinRow = (name) => {
    alert(`Row ${name} is pinned`);
  };
  // END: Declare pin cell data function

  // BEGIN: Declare edit cell data function
  const editRow = (name) => {
    alert(`Row ${name} is opened for edit`);
  };
  // END: Declare edit cell data function

  // BEGIN: Declare close cell data function
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  // END: Declare close cell data function

  // BEGIN: Declare delete cell data function
  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
    alert(`Row ${rowKey} is deleted`);
  };
  // END: Declare delete cell data function

  // BEGIN: Declare hide cell data function
  const hideRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey); // Gọi đến hàm Close Cell Data
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
    alert(`Row ${rowKey} is hided`);
  };
  // END: Declare hide cell data function

  // BEGIN: Khi swipe left or right sẽ gọi đến hàm DidOpen
  const onRowDidOpen = (rowKey) => {
    console.log(`Row ${rowKey} is opened`);
  };
  // END: Khi swipe left or right sẽ gọi đến hàm DidOpen

  // BEGIN: Render ra các thông tin Cell data
  const renderItem = (data) => (
    <TouchableHighlight
      onPress={() => console.log("You touched me")}
      style={styles.rowFront}
      underlayColor={"#E9E9E9"}
    >
      <View>
        <Text>I am {data.item.text} in a SwipeListView</Text>
      </View>
    </TouchableHighlight>
  );
  // END: Render ra các thông tin Cell data

  // BEGIN: Render ra các thông tin ẩn, swipe left or right để hiển thị
  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <Text>Left</Text>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnPin]}
        onPress={() => pinRow(data.item.key)}
      >
        <Text style={styles.backTextWhite}>Ghim</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnEdit]}
        onPress={() => editRow(data.item.key)}
      >
        <Text style={styles.backTextWhite}>Sửa</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnHide]}
        onPress={() => hideRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Ẩn</Text>
      </TouchableOpacity>
    </View>
  );
  // END: Render ra các thông tin ẩn, swipe left or right để hiển thị

  return (
    <SafeAreaView style={styles.container}>
      <SwipeListView
        data={listData} // Liệt kê danh sách data đã khai báo từ useState()
        renderItem={renderItem} // Render ra các thông tin Cell data
        renderHiddenItem={renderHiddenItem} // Render ra các thông tin ẩn, swipe left or right để hiển thị
        leftOpenValue={75}
        rightOpenValue={-225}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen} // Khi swipe left or right sẽ gọi đến hàm DidOpen
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  backTextWhite: {
    fontSize: 12,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#F4F4F4",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#E9E9E9",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnPin: {
    backgroundColor: "#EE0033",
    right: 75,
  },
  backRightBtnEdit: {
    backgroundColor: "#0A2956",
    right: 150,
  },
  backRightBtnHide: {
    backgroundColor: "#DB4E3B",
    right: 0,
  },
});
