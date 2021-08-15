import { StatusBar } from "expo-status-bar";
import React from "react";
import ReactNativeSnapCarousel1 from "./src/ReactNativeSnapCarousel/ReactNativeSnapCarousel1";
import ReactNativeSwipeListView1 from "./src/ReactNativeSwipeListView/ReactNativeSwipeListView1";
import ReactNativeSwipeListView2 from "./src/ReactNativeSwipeListView/ReactNativeSwipeListView2";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      {/* <ReactNativeSnapCarousel1 /> */}
      <ReactNativeSwipeListView1 />
      {/* <ReactNativeSwipeListView2 /> */}
    </>
  );
}
