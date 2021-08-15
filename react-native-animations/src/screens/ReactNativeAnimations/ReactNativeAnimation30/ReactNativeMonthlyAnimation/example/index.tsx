import React from "react";
import { StatusBar, SafeAreaView } from "react-native";
import moment from "moment";
import RNMonthly from "./lib/RNMonthly";
import colors from "../../../../../assets/styles/colors";

export default function ReactNativeMonthlyAnimationExample() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.white,
          width: "100%",
        }}
      >
        {/* <RNMonthly
          numberOfDays={31}
          activeDays={[1, 5, 6, 11, 21, 31]}
          today={parseInt(moment().format("D"))}
          todayTextStyle={{ color: "#146C6D" }}
          itemContainerStyle={{ borderColor: "#146C6D" }}
        />
        <RNMonthly
          numberOfDays={30}
          activeBackgroundColor="green"
          inactiveBackgroundColor="#E6FFDE"
          activeDays={[1, 5, 6, 11, 21, 31]}
        /> */}
        <RNMonthly
          numberOfDays={31}
          activeBackgroundColor={colors.violet600}
          inactiveBackgroundColor={colors.violet200}
          activeDays={[2, 8, 12, 16, 24]}
          today={parseInt(moment().format("D"))}
          todayTextStyle={{ color: colors.violet600 }}
          itemContainerStyle={{ borderColor: colors.violet600 }}
        />
      </SafeAreaView>
    </>
  );
}
