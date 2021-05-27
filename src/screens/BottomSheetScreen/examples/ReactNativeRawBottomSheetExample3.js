import React, { Component } from "react";
import {
  View,
  Button,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class ReactNativeRawBottomSheetExample3 extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button title="OPEN BOTTOM SHEET" onPress={() => this.RBSheet.open()} />
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={600}
          openDuration={250}
          customStyles={{
            // The Root of Component (You can change the `backgroundColor` or any styles)
            wrapper: {
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            },
            // The Container of Bottom Sheet
            container: {
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
            },
            // The Draggable Icon (If you set closeOnDragDown to true)
            draggableIcon: {
              width: 32,
              height: 4,
              borderRadius: 2,
              backgroundColor: "#D5DBE6",
              marginTop: 8,
              marginBottom: 16,
            },
          }}
        >
          {/* BEGIN: Bottom Sheet Content */}
          <View style={styles.bottomSheetHeaderAvatarContainer}>
            {/* BEGIN: Avatar + Name */}
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Image
                style={styles.bottomSheetHeaderAvatar}
                source={require("./assets/avatar.png")}
              />
              <Text style={styles.bottomSheetHeaderName}>
                Nguyễn Thành Luân
              </Text>
            </View>
            {/* END: Avatar + Name */}

            {/* BEGIN: Enter Your Money */}
            <View style={styles.enterYourMoneyContainer}>
              <Text style={styles.moneyPlaceholder}>10.000</Text>
            </View>
            {/* END: Enter Your Money */}

            {/* BEGIN: Money Bar Suggestion */}
            <View style={styles.moneyBarSuggestionContainer}>
              {data.map((item, index) => (
                <View key={index} style={styles.moneyBarSuggestionItem}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => alert(`Lựa chọn ${item.money}`)}
                  >
                    <Text style={styles.moneyBarSuggestionAmount}>
                      {item.money}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            {/* END: Money Bar Suggestion */}

            {/* BEGIN: Custom Keyboard Numeric */}
            <View style={styles.customKeyboardNumericContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.numPadContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => alert("Number 1 is Clicked.")}
                  >
                    <Text style={styles.numPadText}>1</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.numPadContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => alert("Number 2 is Clicked.")}
                  >
                    <Text style={styles.numPadText}>2</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.numPadContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => alert("Number 3 is Clicked.")}
                  >
                    <Text style={styles.numPadText}>3</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.numPadContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => alert("Number 4 is Clicked.")}
                  >
                    <Text style={styles.numPadText}>4</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.numPadContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => alert("Number 5 is Clicked.")}
                  >
                    <Text style={styles.numPadText}>5</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.numPadContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => alert("Number 6 is Clicked.")}
                  >
                    <Text style={styles.numPadText}>6</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.numPadContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => alert("Number 7 is Clicked.")}
                  >
                    <Text style={styles.numPadText}>7</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.numPadContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => alert("Number 8 is Clicked.")}
                  >
                    <Text style={styles.numPadText}>8</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.numPadContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => alert("Number 9 is Clicked.")}
                  >
                    <Text style={styles.numPadText}>9</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.numPadContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => alert("Number 0 is Clicked.")}
                  >
                    <Text style={styles.numPadText}>0</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.numPadContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => alert("Number 000 is Clicked.")}
                  >
                    <Text style={styles.numPadText}>000</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.numPadContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => alert("Xóa is Clicked.")}
                  >
                    <Text style={styles.numPadText}>Xóa</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* END: Custom Keyboard Numeric */}

            {/* BEGIN: Button Primary */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => alert("Xác nhận chuyển tiền")}
            >
              <View style={styles.buttonPrimaryContainer}>
                <Text style={styles.buttonPrimaryText}>Xác nhận</Text>
              </View>
            </TouchableOpacity>
            {/* END: Button Primary */}
          </View>
          {/* END: Bottom Sheet Content */}
        </RBSheet>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomSheetHeaderAvatarContainer: {
    alignItems: "center",
  },
  bottomSheetHeaderAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: "#ffffff",
  },
  bottomSheetHeaderName: {
    paddingTop: 8,
    color: "#222222",
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "700",
  },
  enterYourMoneyContainer: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  moneyPlaceholder: {
    color: "#E9E9E9",
    fontSize: 48,
    lineHeight: 58,
    fontWeight: "700",
  },
  moneyBarSuggestionContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    height: 48,
  },
  moneyBarSuggestionItem: {
    width: "33.3%",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  moneyBarSuggestionAmount: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "500",
  },
  buttonPrimaryContainer: {
    width: windowWidth - 32,
    height: 48,
    marginBottom: 16,
    backgroundColor: "#EE0033",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPrimaryText: {
    color: "#ffffff",
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "500",
    paddingLeft: 16,
    paddingRight: 16,
  },
  customKeyboardNumericContainer: {
    marginTop: 24,
    marginBottom: 24,
  },
  numPadContainer: {
    width: "33.33%",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  numPadText: {
    color: "#222222",
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "500",
    textAlign: "center",
  },
});

const data = [
  {
    money: "10.000",
  },
  {
    money: "100.000",
  },
  {
    money: "1.000.000",
  },
];
