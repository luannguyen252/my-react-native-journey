import React from "react";
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions,
  TouchableHighlight,
} from "react-native";

import { Box, ListItem, StackHeader, theme } from "../components";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeNavParamList } from "../../types";
import { categories } from "../data";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width,
    alignItems: "center",
    backgroundColor: theme.colors.white,
    flex: 1,
  },
});

interface CategoriesProps {}

const Categories = ({
  navigation,
}: StackScreenProps<HomeNavParamList, "Categories">) => {
  return (
    <SafeAreaView style={styles.container}>
      <Box>
        <StackHeader title="Categories" back={() => navigation.goBack()} />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() =>
                navigation.navigate("CategoryDetail", { category: item })
              }
              underlayColor={theme.colors.light}
            >
              <ListItem label={item.label} icon={item.icon} />
            </TouchableHighlight>
          )}
        />
      </Box>
    </SafeAreaView>
  );
};

export default Categories;
