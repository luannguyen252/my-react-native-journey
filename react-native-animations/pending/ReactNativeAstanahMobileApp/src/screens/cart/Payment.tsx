import React from "react";
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
  Dimensions,
} from "react-native";

import { Box, ListItem, StackHeader, Text, theme } from "../../components";
import { BankTransferIcon, CardTransferIcon, PayPalIcon } from "../../Svg";
import { StackScreenProps } from "@react-navigation/stack";
import { CartNavParamList } from "../../../types";

const paymentOptions = [
  { id: 1, title: "Credit Card or Debit Card", icon: <CardTransferIcon /> },
  { id: 1, title: "PayPal", icon: <PayPalIcon /> },
  { id: 1, title: "Bank Transfer", icon: <BankTransferIcon /> },
];

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});

interface PaymentProps {}

const Payment = ({
  navigation,
}: StackScreenProps<CartNavParamList, "Payment">) => {
  return (
    <SafeAreaView style={styles.container}>
      <Box style={{ height }}>
        <StackHeader title="Payment" back={() => navigation.goBack()} />
        <ScrollView decelerationRate={16} showsVerticalScrollIndicator={false}>
          {paymentOptions.map(({ title, icon }, index) => (
            <TouchableHighlight
              underlayColor={theme.colors.light}
              onPress={() => navigation.navigate("ChooseCard")}
            >
              <ListItem key={index} label={title} icon={icon} />
            </TouchableHighlight>
          ))}
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};

export default Payment;
