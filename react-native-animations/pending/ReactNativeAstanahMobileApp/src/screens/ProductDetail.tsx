import React from "react";
import {
  Dimensions,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import {
  Box,
  LikeButton,
  ProductDetailImgSlider,
  StackHeader,
  Text,
  theme,
  Ratings,
  VariantSlider,
  Button,
  ProductCard,
} from "../components";
import { HomeNavParamList } from "../../types";
import { numberWithCommas } from "../utils";
import sizes from "../data/size";
import colors from "../data/color";
import { products } from "../data";
import { useAppContext } from "../context/context";

const { width } = Dimensions.get("window");
const CARD_WIDTH = 141;
const CARD_HEIGHT = 238;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    width,
  },
  titleBox: {
    flexDirection: "row",
    width,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: theme.spacing.xl,
    paddingRight: theme.spacing.xl,
    marginTop: 40,
  },
  rowBox: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 100,
  },
});

const productImages = [
  { id: 1, image: require("../../assets/products/productDetail1.png") },
  { id: 2, image: require("../../assets/products/productDetail2.png") },
  { id: 3, image: require("../../assets/products/productDetail3.png") },
  { id: 3, image: require("../../assets/products/productDetail2.png") },
  { id: 3, image: require("../../assets/products/productDetail1.png") },
];

interface ProductDetailProps {}

const ProductDetail = ({
  navigation,
  route,
}: StackScreenProps<HomeNavParamList, "ProductDetail">) => {
  const { isProductInCart, manageCart } = useAppContext();
  const { product } = route.params;
  const {
    id,
    title,
    image,
    price,
    discountPrice,
    ratings,
    description,
  } = product;
  return (
    <SafeAreaView style={styles.container}>
      <Box>
        <StackHeader title={title} back={() => navigation.goBack()} />
        <ScrollView
          scrollEventThrottle={16}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <ProductDetailImgSlider banners={productImages} />
          <Box style={styles.titleBox}>
            <Text variant="h3" color="primary" style={{ width: width * 0.7 }}>
              {title}
            </Text>
            <Box style={{ flex: 1 }} />
            <LikeButton />
          </Box>
          <Box style={styles.rowBox}>
            <Ratings rating={ratings ? ratings : 2} size={18} />
            <Box style={{ flex: 1 }} />
          </Box>
          <Box style={styles.rowBox}>
            <Text variant="h3" color="secondary" marginTop="s">
              {"ZK" + numberWithCommas(price)}
            </Text>
            <Box style={{ flex: 1 }} />
          </Box>
          <Box style={styles.rowBox}>
            <Text variant="h4" color="primary" marginTop="m" marginBottom="m">
              Select Size
            </Text>
            <Box style={{ flex: 1 }} />
          </Box>
          <VariantSlider value={sizes} />
          <Box style={styles.rowBox}>
            <Text variant="h4" color="primary" marginTop="m" marginBottom="m">
              Select Color
            </Text>
            <Box style={{ flex: 1 }} />
          </Box>
          <VariantSlider value={colors} />
          <Box style={styles.rowBox}>
            <Text variant="h4" color="primary" marginTop="m" marginBottom="m">
              Specification
            </Text>
            <Box style={{ flex: 1 }} />
          </Box>
          <Box style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Text variant="b3" color="grey" style={{ lineHeight: 20 }}>
              {description}
            </Text>
          </Box>
          <Box style={styles.rowBox}>
            <Text variant="h4" color="primary" marginTop="m" marginBottom="m">
              You Might Also Like
            </Text>
            <Box style={{ flex: 1 }} />
          </Box>
          <Box style={{ paddingLeft: 20, paddingRight: 20 }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={products}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.push("ProductDetail", { product: item })
                  }
                >
                  <ProductCard
                    product={item}
                    width={CARD_WIDTH}
                    height={CARD_HEIGHT}
                    noRating
                    marginRight={20}
                  />
                </TouchableOpacity>
              )}
            />
          </Box>
          <Box style={styles.button}>
            <Button
              label="Add to Cart"
              onPress={() => {
                if (isProductInCart(product))
                  return alert("Product already in cart");

                manageCart("ADD_TO_CART", product);
                alert("product added to cart");
              }}
            />
          </Box>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};

export default ProductDetail;
