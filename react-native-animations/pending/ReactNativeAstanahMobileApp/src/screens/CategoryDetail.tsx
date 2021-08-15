import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { HomeNavParamList } from "../../types";
import { StackHeader, ProductCard, theme, Box } from "../components";
import { products } from "../data";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: "center",
  },
});

interface CategoryDetailProps {}

const CategoryDetail = ({
  navigation,
  route,
}: StackScreenProps<HomeNavParamList, "CategoryDetail">) => {
  const { category } = route.params;
  const { label } = category;
  return (
    <SafeAreaView style={styles.container}>
      <StackHeader title={label} back={() => navigation.goBack()} />
      <Box style={{ marginTop: 20, paddingBottom: 80 }}>
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductDetail", { product: item })
              }
            >
              <ProductCard product={item} />
            </TouchableOpacity>
          )}
        />
      </Box>
    </SafeAreaView>
  );
};

export default CategoryDetail;
