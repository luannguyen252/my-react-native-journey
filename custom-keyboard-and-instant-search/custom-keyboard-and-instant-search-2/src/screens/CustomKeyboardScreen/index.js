import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";
import { numberWithCommas } from "../../utils/Tool";
import IconDel from "./assets/IconDel";
import styles from "./styles";

const initMoneySuggestion = [
  {
    money: 10000,
  },
  {
    money: 100000,
  },
  {
    money: 1000000,
  },
];

const getMoneySuggestions = (money) => {
  let suggestions = [
    money * 1000,
    money * 100,
    money * 10,
    money,
    Math.floor(money / 10),
    Math.floor(money / 100),
    Math.floor(money / 1000),
  ];

  let filteredSuggestions = [];
  suggestions.map((item) => {
    const charCount = `${item}`.length;
    if (filteredSuggestions.length < 3 && charCount >= 5 && charCount <= 9) {
      filteredSuggestions.push({ money: item });
    }
  });

  return filteredSuggestions.length >= 3
    ? filteredSuggestions.splice(0, 3).reverse()
    : initMoneySuggestion;
};

export default function CustomKeyboardScreen() {
  // Set money ở input money mặc định là 10.000đ
  const [money, setMoney] = useState(0);
  // Set active và inactive cho input money mặc định là false để opacity là 0.1
  // const [active, setActive] = useState(false);

  const numberHandler = (number) => () => {
    const newMoney = money * 10 + number;
    if (`${newMoney}`.length <= 9) {
      setMoney(newMoney);
    }
  };
  const deleteNumber = () => {
    const newMoney = Math.floor(money / 10);
    setMoney(newMoney);
  };

  const x1000Handler = () => {
    let newMoney = money;

    if (`${newMoney * 10}`.length <= 9) {
      newMoney = newMoney * 10;
      if (`${newMoney * 10}`.length <= 9) {
        newMoney = newMoney * 10;
        if (`${newMoney * 10}`.length <= 9) {
          newMoney = newMoney * 10;
        }
      }
      setMoney(newMoney);
    }
  };
  const selectMoney = (money) => () => {
    setMoney(money);
  };

  const moneySuggestions = getMoneySuggestions(money);

  return (
    <View style={globalStyles.container}>
      <SafeAreaView>
        <StatusBar style="auto" />

        <View style={{ alignItems: "center" }}>
          {/* BEGIN: Enter Your Money */}
          <View style={styles.enterYourMoneyContainer}>
            {/* Khi nhập số tiền hoặc lựa chọn số tiền thì active opacity là 1 */}
            <Text style={[styles.moneyText, { opacity: money > 0 ? 1 : 0.1 }]}>
              {money === 0 ? "10.000" : numberWithCommas(money)}
            </Text>
          </View>
          {/* END: Enter Your Money */}

          {/* BEGIN: Money Bar Suggestion */}
          <View style={styles.moneyBarSuggestionContainer}>
            {/* Load data 3 mức tiền mặc định ban đầu sẽ suggest cho người dùng chọn nhanh, khi select thì active input money với opacity là 1 */}
            {moneySuggestions.map((item, index) => {
              return (
                <TouchableOpacity
                  key={`moneySuggestion${index}`}
                  activeOpacity={0.8}
                  onPress={selectMoney(item.money)}
                  style={styles.moneyBarSuggestionItem}
                >
                  <Text style={styles.moneyBarSuggestionAmount}>
                    {numberWithCommas(item.money)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {/* END: Money Bar Suggestion */}

          {/* BEGIN: Custom Keyboard Numeric */}
          {/* Khi bấm vào các trường ô nhập số keyboard bên dưới thì tạo thành một dãy số ở input money */}
          <View style={styles.customKeyboardNumericContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* Người dùng bấm 1 sẽ tự động thêm 1 đằng sau dãy số */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={numberHandler(1)}
                style={styles.numPadContainer}
              >
                <Text style={styles.numPadText}>1</Text>
              </TouchableOpacity>

              {/* Người dùng bấm 2 sẽ tự động thêm 2 đằng sau dãy số */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={numberHandler(2)}
                style={styles.numPadContainer}
              >
                <Text style={styles.numPadText}>2</Text>
              </TouchableOpacity>

              {/* Người dùng bấm 3 sẽ tự động thêm 3 đằng sau dãy số */}

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={numberHandler(3)}
                style={styles.numPadContainer}
              >
                <Text style={styles.numPadText}>3</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* Người dùng bấm 4 sẽ tự động thêm 4 đằng sau dãy số */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={numberHandler(4)}
                style={styles.numPadContainer}
              >
                <Text style={styles.numPadText}>4</Text>
              </TouchableOpacity>

              {/* Người dùng bấm 5 sẽ tự động thêm 5 đằng sau dãy số */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={numberHandler(5)}
                style={styles.numPadContainer}
              >
                <Text style={styles.numPadText}>5</Text>
              </TouchableOpacity>

              {/* Người dùng bấm 6 sẽ tự động thêm 6 đằng sau dãy số */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={numberHandler(6)}
                style={styles.numPadContainer}
              >
                <Text style={styles.numPadText}>6</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* Người dùng bấm 7 sẽ tự động thêm 7 đằng sau dãy số */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={numberHandler(7)}
                style={styles.numPadContainer}
              >
                <Text style={styles.numPadText}>7</Text>
              </TouchableOpacity>

              {/* Người dùng bấm 8 sẽ tự động thêm 8 đằng sau dãy số */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={numberHandler(8)}
                style={styles.numPadContainer}
              >
                <Text style={styles.numPadText}>8</Text>
              </TouchableOpacity>

              {/* Người dùng bấm 9 sẽ tự động thêm 9 đằng sau dãy số */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={numberHandler(9)}
                style={styles.numPadContainer}
              >
                <Text style={styles.numPadText}>9</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* Người dùng bấm 0 sẽ tự động thêm 0 đằng sau dãy số */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={numberHandler(0)}
                style={styles.numPadContainer}
              >
                <Text style={styles.numPadText}>0</Text>
              </TouchableOpacity>

              {/* Người dùng bấm 000 sẽ tự động thêm 000 đằng sau dãy số */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={x1000Handler}
                style={styles.numPadContainer}
              >
                <Text style={styles.numPadText}>000</Text>
              </TouchableOpacity>

              {/* Khi người dùng bấm nút Delete thì sẽ xóa từ ký tự số bắt đầu từ phải qua trái */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={deleteNumber}
                style={styles.numPadContainer}
              >
                <IconDel />
              </TouchableOpacity>
            </View>
          </View>
          {/* END: Custom Keyboard Numeric */}

          {/* BEGIN: Button Primary */}
          {/* Khi bấm xác nhận sẽ truyền dữ liệu về số tiền mà người dùng đã nhập ở input money bên trên cùng */}
          {/* Lưu ý: Kiểm tra dữ liệu nếu là giá trị 0 ở đầu tiên, ví dụ: 0, 00, 000, 0... thì thông báo không Chuyển được tiền */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (money < 10000) {
                alert("Không chuyển được tiền");
                return;
              }

              alert(
                `Xác nhận chuyển số tiền là\nlabel = ${numberWithCommas(
                  money
                )}, value = ${money}`
              );
            }}
          >
            <View style={styles.buttonPrimaryContainer}>
              <Text style={styles.buttonPrimaryText}>Xác nhận</Text>
            </View>
          </TouchableOpacity>
          {/* END: Button Primary */}
        </View>
      </SafeAreaView>
    </View>
  );
}
