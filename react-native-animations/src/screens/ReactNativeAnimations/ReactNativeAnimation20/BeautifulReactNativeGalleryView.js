import { MotiView } from "moti";
import * as Animatable from "react-native-animatable";
import * as React from "react";
import {
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  SafeAreaViewBase,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Animated,
  Easing,
  StyleSheet,
} from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import colors from "../../../assets/styles/colors";
import styles from "./styles";

const { width, height } = Dimensions.get("screen");
const DURATION = 500;
const API_KEY = "563492ad6f9170000100000134c6a4c24cc14b139a3e8e4064d98b72";
const API_URL =
  "https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20";
const IMAGE_SIZE = 80;
const SPACING = 16;

// BEGIN: Fetch all images from Pexels API
const fetchImageFromPexels = async () => {
  const data = await fetch(API_URL, {
    headers: {
      Authorization: API_KEY,
    },
  });

  // const results = await data.json();
  // return results;

  const { photos } = await data.json(); // Only fetch photos

  return photos;
};
// END: Fetch all images from Pexels API

export default function BeautifulReactNativeGalleryView() {
  const [images, setImages] = React.useState(null); // Declare state for images

  // BEGIN: Use Effect to load images
  React.useEffect(() => {
    // Fetch images from API
    const fetchImages = async () => {
      const images = await fetchImageFromPexels();
      console.log(images);
      setImages(images);
    };

    fetchImages(); // Call fetch images
  }, []);
  // END: Use Effect to load images

  const topRef = React.useRef(); // Use ref for fetch images (background images)
  const thumbRef = React.useRef(); // Use ref for thumbnail images (thumb images below)
  const [activeIndex, setActiveIndex] = React.useState(0); // Setup active index state
  const scrollToActiveIndex = (index) => {
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      // When you scroll to thumb images, offset will to center, thumbnail images and fetch images will be center
      thumbRef?.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
      // When you scroll to end or start offset will be 0
      thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  // BEGIN: Check if don't have images from API
  if (!images) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={[globalStyles.bodyText, { fontWeight: "500" }]}>
          Loading...
        </Text>
      </View>
    );
  }
  // END: Check if don't have images from API

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* BEGIN: Setup images with full screen display */}
        <FlatList
          ref={topRef} // Listen thumb ref and check image to match with thumb ref below, and then select to that image
          data={images} // Call images from state, that images fetched from API
          keyExtractor={(item) => item.id.toString()} // Set key for each images
          horizontal // Set FlatList to scroll horizontal
          pagingEnabled // Set paging for FlatList
          showsHorizontalScrollIndicator={false} // Hide scroll indicator
          // Catch event scroll on FlatList when behaviour is end
          onMomentumScrollEnd={(event) => {
            /**
             * When you scroll to select fetch images,
             * call that image to match with thumb image below
             */
            scrollToActiveIndex(
              Math.floor(event.nativeEvent.contentOffset.x / width)
            );
          }}
          // Render images from data above to View
          renderItem={({ item }) => {
            return (
              <View style={{ width, height }}>
                <Image
                  source={{ uri: item.src.portrait }}
                  style={[StyleSheet.absoluteFillObject]}
                />
              </View>
            );
          }}
        />
        {/* END: Setup images with full screen display */}

        {/* BEGIN: Setup thumbnail images as page navigation */}
        <FlatList
          ref={thumbRef} // Call thumb ref, when you select image from thumb ref will transfer to top ref to select
          data={images} // Call images from state, that images fetched from API
          keyExtractor={(item) => item.id.toString()} // Set key for each images as thumbnail
          horizontal // Set FlatList to scroll horizontal
          showsHorizontalScrollIndicator={false} // Hide scroll indicator
          style={{ position: "absolute", bottom: 144 }}
          // FlatList styles inside container
          contentContainerStyle={{
            paddingLeft: SPACING,
            paddingRight: SPACING,
          }}
          // Render images from data match with fetch images
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                /**
                 * Check event when you select thumbnail,
                 * suddenly fetch images (background images) will match with thumb photo,
                 * make sure thumb photo will be center with fetch image
                 */
                onPress={() => scrollToActiveIndex(index)}
              >
                <Image
                  source={{ uri: item.src.portrait }}
                  style={{
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
                    borderRadius: SPACING,
                    marginRight: SPACING,
                    borderWidth: 2,
                    borderColor:
                      activeIndex === index ? colors.white : "transparent", // Check if thumbnail is selected to hightlight with border color
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />
        {/* END: Setup thumbnail images as page navigation */}
      </ScrollView>
    </View>
  );
}
