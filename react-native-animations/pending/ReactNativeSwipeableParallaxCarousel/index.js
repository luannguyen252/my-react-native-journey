import React from "react";
import { View, Text } from "react-native";
import SwipeableParallaxCarousel from "./SwipeableParallaxCarousel";

const datacarousel = [
  {
    id: 1,
    title: "Valerian and the City of a Thousand Planets",
    imagePath:
      "https://image.tmdb.org/t/p/w780/o6OhxtsgMurL4h68Uqei0aSPMNr.jpg",
  },
  {
    id: 2,
    imagePath:
      "https://image.tmdb.org/t/p/w780/fn4n6uOYcB6Uh89nbNPoU2w80RV.jpg",
  },
  {
    id: 3,
    title: "Baby Driver",
    subtitle: "More than just a trend",
    imagePath:
      "https://image.tmdb.org/t/p/w780/xWPXlLKSLGUNYzPqxDyhfij7bBi.jpg",
  },
];

export default function ReactNativeSwipeableParallaxCarousel() {
  return <SwipeableParallaxCarousel data={datacarousel} />;
}
