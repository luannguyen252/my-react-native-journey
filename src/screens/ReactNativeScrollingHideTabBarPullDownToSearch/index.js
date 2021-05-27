import React from "react";
import { StatusBar } from "expo-status-bar";
import ScrollingHideTabBar from "./src/ScrollingHideTabBar";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <ScrollingHideTabBar />
    </>
  );
}
