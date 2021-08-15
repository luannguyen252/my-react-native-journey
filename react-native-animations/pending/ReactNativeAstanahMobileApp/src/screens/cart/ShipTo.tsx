import React, { useState } from "react";
import { ScrollView, StyleSheet, SafeAreaView } from "react-native";

import { AddressItem, Box, StackHeader, theme, Button } from "../../components";
import { addresses } from "../../data";
import { StackScreenProps } from "@react-navigation/stack";
import { CartNavParamList } from "../../../types";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
  },
});

interface ShipToProps {}

const ShipTo = ({
  navigation,
}: StackScreenProps<CartNavParamList, "ShipTo">) => {
  const [select, setSelect] = useState<boolean>(false);
  return (
    <SafeAreaView style={styles.container}>
      <Box style={{ alignItems: "center" }}>
        <StackHeader
          title="Ship To"
          plus={() => true}
          back={() => navigation.goBack()}
        />
        <Box
          marginTop="s"
          marginBottom="m"
          style={{ height: "75%", paddingBottom: 10 }}
        >
          <ScrollView
            decelerationRate={16}
            showsVerticalScrollIndicator={false}
          >
            {addresses.map((address, index) => (
              <AddressItem key={index} address={address} />
            ))}
          </ScrollView>
        </Box>
        <Button label="Next" onPress={() => navigation.navigate("Payment")} />
      </Box>
    </SafeAreaView>
  );
};

export default ShipTo;
