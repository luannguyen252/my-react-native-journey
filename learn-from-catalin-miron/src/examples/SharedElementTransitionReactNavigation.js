import { SharedElement } from "react-native-shared-element";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const ITEM_SIZE = 120;
const SPACING = 16;
const BG_COLOR = "#C1CEE077";
const data = [
  {
    key: "0",
    image:
      "http://www.pngall.com/wp-content/uploads/2016/05/Orange-PNG-Clipart.png",
    name: "Orange 1",
    description:
      "The orange is the fruit of various citrus species in the family Rutaceae; it primarily refers to Citrus × sinensis, which is also called sweet orange, to distinguish it from the related Citrus × aurantium, referred to as bitter orange.",
  },
  {
    key: "1",
    image:
      "http://www.pngall.com/wp-content/uploads/2016/05/Orange-PNG-Clipart.png",
    name: "Orange 2",
    description:
      "The orange is the fruit of various citrus species in the family Rutaceae; it primarily refers to Citrus × sinensis, which is also called sweet orange, to distinguish it from the related Citrus × aurantium, referred to as bitter orange.",
  },
  {
    key: "2",
    image:
      "http://www.pngall.com/wp-content/uploads/2016/05/Orange-PNG-Clipart.png",
    name: "Orange 3",
    description:
      "The orange is the fruit of various citrus species in the family Rutaceae; it primarily refers to Citrus × sinensis, which is also called sweet orange, to distinguish it from the related Citrus × aurantium, referred to as bitter orange.",
  },
];

export default function SharedElementTransitionReactNavigation() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <FlatList
          data={data}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(
                    "Shared Element Transition React Navigation Details",
                    { item }
                  );
                }}
              >
                <View style={styles.item}>
                  <View>
                    <SharedElement id={`item.${item.key}.name`}>
                      <Text style={styles.name}>{item.name}</Text>
                    </SharedElement>
                    <SharedElement id={`item.${item.key}.description`}>
                      <Text style={styles.description}>{item.description}</Text>
                    </SharedElement>
                  </View>
                  <SharedElement id={`item.${item.key}.image`}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                  </SharedElement>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    height: ITEM_SIZE * 1.2,
    borderRadius: 12,
    marginTop: SPACING,
    marginLeft: SPACING,
    marginRight: SPACING,
    marginBottom: SPACING,
    padding: SPACING,
    backgroundColor: BG_COLOR,
    overflow: "hidden",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: SPACING,
  },
  description: {
    fontSize: 12,
    opacity: 0.7,
    paddingRight: SPACING * 6,
  },
  image: {
    height: ITEM_SIZE * 1.2,
    width: "100%",
    position: "absolute",
    bottom: 0,
    right: "-40%",
    resizeMode: "center",
  },
});
