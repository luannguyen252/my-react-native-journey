import React from "react";
import { View, StyleSheet } from "react-native";
import { MainLoader } from "react-native-preloader-shimmer";

function MainLoaderShimmer() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <MainLoader
        barStyle={"dark-content"} //Status bar icon color -required filed light-content or dark-content
        animSpeed={100} // Animation Run speed - default 100ms
        visible={true} //Visibility of MainLoader default true
        backgroundColor={"white"} // backgroundColor of main container default = #ffffff
      />
    </View>
  );
}

const ReactNativePreloaderShimmer = () => {
  return (
    <>
      <MainLoaderShimmer />
    </>
  );
};

export default ReactNativePreloaderShimmer;
