// From: https://github.com/osdnk/react-native-reanimated-bottom-sheet/issues/138
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

let fall = new Animated.Value(1);

export default class ReanimatedBottomSheetExample9 extends React.Component {
  bs = React.createRef();

  // Bottom Sheet Content
  renderInner = () => (
    <View style={styles.bottomSheetContent}>
      <Text>Bottom Sheet Content Here</Text>
    </View>
  );

  // Bottom Sheet Header
  renderHeader = () => (
    <View style={styles.bottomSheetHeader}>
      <View style={styles.bottomSheetHeaderAvatarContainer}>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Image
            style={styles.bottomSheetHeaderAvatar}
            source={require("./assets/avatar.png")}
          />
          <Text
            style={{
              paddingTop: 8,
              color: "#222222",
              fontSize: 18,
              lineHeight: 22,
              fontWeight: "700",
            }}
          >
            Nguyễn Thành Luân
          </Text>
        </View>
      </View>
    </View>
  );

  // BEGIN: Overlay
  renderShadow = () => {
    const animatedShadowOpacity = Animated.interpolateNode(fall, {
      inputRange: [0, 1],
      outputRange: [0.6, 0],
    });

    return (
      <Animated.View
        pointerEvents="none"
        style={[
          styles.overlayContainer,
          {
            opacity: animatedShadowOpacity,
          },
        ]}
      />
    );
  };
  // END: Overlay

  render() {
    return (
      <View style={styles.container}>
        {/* BEGIN: Overlay */}
        {this.renderShadow()}
        {/* END: Overlay */}

        {/* BEGIN: Bottom Sheet */}
        <BottomSheet
          ref={this.bs}
          snapPoints={[600, 0]}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
          initialSnap={1}
          callbackNode={fall}
        />
        {/* END: Bottom Sheet */}

        <TouchableOpacity
          style={{ marginTop: 100 }}
          onPress={() => this.bs.current.snapTo(0)}
        >
          <Text
            style={{
              fontSize: 24,
              lineHeight: 32,
              fontWeight: "bold",
            }}
          >
            Click To Show Bottom Sheet
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheetContent: {
    height: 600,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  bottomSheetHeader: {
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -16,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    height: 64,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: "relative",
    alignItems: "center",
  },
  bottomSheetHeaderAvatarContainer: {
    position: "absolute",
    zIndex: 1,
    bottom: 0,
  },
  bottomSheetHeaderAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: "#ffffff",
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000000",
  },
});
