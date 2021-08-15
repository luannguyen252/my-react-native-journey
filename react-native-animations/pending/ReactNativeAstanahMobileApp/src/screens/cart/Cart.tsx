import React from "react";
import { Dimensions, ScrollView, StyleSheet, SafeAreaView } from "react-native";

import {
  Box,
  StackHeader,
  TextInput,
  theme,
  Button,
  Text,
} from "../../components";
import { products } from "../../data";
import CartItem from "../../components/cart/CartItem";
import { StackScreenProps } from "@react-navigation/stack";
import { CartNavParamList } from "../../../types";
import {
  IMPORT_CHARGES,
  SHIPPING_COST,
  useAppContext,
} from "../../context/context";
import { numberWithCommas } from "../../utils";

const { height, width } = Dimensions.get("window");
const COMPONENT_WIDTH = width - theme.spacing.xl * 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  couponContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: COMPONENT_WIDTH,
  },
  textInput: {
    borderTopLeftRadius: theme.spacing.s,
    borderBottomLeftRadius: theme.spacing.s,
    borderWidth: 1,
    height: 50,
    borderColor: theme.colors.light,
    width: COMPONENT_WIDTH * 0.7,
    paddingLeft: 5,
  },
  button: {
    borderTopRightRadius: theme.spacing.s,
    borderBottomRightRadius: theme.spacing.s,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    height: 50,
  },
  summary: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.light,
    width: COMPONENT_WIDTH,
    marginTop: 10,
    paddingLeft: theme.spacing.xl,
    paddingRight: theme.spacing.xl,
    paddingBottom: 15,
  },
  summaryItem: {
    flexDirection: "row",
    marginTop: 10,
  },
  dottedLine: {
    borderWidth: 1,
    borderColor: theme.colors.light,
    borderStyle: "dashed",
    marginTop: 15,
  },
  addToCart: {
    marginTop: 10,
  },
  noItem: {
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    top: "50%",
  },
});

interface CartProps {}

const Cart = ({ navigation }: StackScreenProps<CartNavParamList, "Cart">) => {
  const { cart, cartTotal, manageCart } = useAppContext();
  return (
    <SafeAreaView style={styles.container}>
      <Box style={{ alignItems: "center" }}>
        <StackHeader title="Your Cart" />
        {cart.length > 0 ? (
          <>
            <Box style={{ height: height * 0.355 }}>
              <ScrollView
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10 }}
              >
                {cart.map((product, index) => {
                  return (
                    <CartItem
                      key={index}
                      product={product}
                      margin={10}
                      deleteItem={() => manageCart("REMOVE_FROM_CART", product)}
                    />
                  );
                })}
              </ScrollView>
            </Box>
            <Box style={styles.couponContainer}>
              <Box style={styles.textInput}>
                <TextInput
                  placeholder="Enter Coupon Code"
                  width={COMPONENT_WIDTH * 0.65}
                  height={53}
                  noBorderRad
                  noBorder
                  style={{ overflow: "hidden" }}
                />
              </Box>
              <Box style={styles.button}>
                <Button
                  label="Apply"
                  onPress={() => alert("coupon activated")}
                  width={COMPONENT_WIDTH * 0.3}
                  height={48}
                  noShadow
                  noBorderRad
                />
              </Box>
            </Box>
            <Box style={styles.summary}>
              <Box style={styles.summaryItem}>
                <Text variant="b2" color="grey">
                  Items({cart.length})
                </Text>
                <Box style={{ flex: 1 }} />
                <Text variant="b2" color="primary">
                  {"ZK" + numberWithCommas(cartTotal)}
                </Text>
              </Box>
              <Box style={styles.summaryItem}>
                <Text variant="b2" color="grey">
                  Shipping
                </Text>
                <Box style={{ flex: 1 }} />
                <Text variant="b2" color="primary">
                  {"ZK" + numberWithCommas(SHIPPING_COST)}
                </Text>
              </Box>
              <Box style={styles.summaryItem}>
                <Text variant="b2" color="grey">
                  Import Charges
                </Text>
                <Box style={{ flex: 1 }} />
                <Text variant="b2" color="primary">
                  {"ZK" + numberWithCommas(IMPORT_CHARGES)}
                </Text>
              </Box>
              <Box style={styles.dottedLine} />
              <Box style={styles.summaryItem}>
                <Text variant="b2" color="primary">
                  Total
                </Text>
                <Box style={{ flex: 1 }} />
                <Text variant="b2" color="primary">
                  {"ZK" +
                    numberWithCommas(
                      cartTotal + IMPORT_CHARGES + SHIPPING_COST
                    )}
                </Text>
              </Box>
            </Box>
            <Box style={styles.addToCart}>
              <Button
                label="Check Out"
                onPress={() => navigation.navigate("ShipTo")}
              />
            </Box>
          </>
        ) : (
          <Box style={styles.noItem}>
            <Text variant="h4" color="primary">
              No items in Cart
            </Text>
          </Box>
        )}
      </Box>
    </SafeAreaView>
  );
};

export default Cart;

// Conditional Rendering N
