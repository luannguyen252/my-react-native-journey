import React, { PureComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";

export default class ReanimatedBottomSheetExample8 extends PureComponent {
  // Bottom Sheet Content
  renderInner = () => (
    <React.Fragment>
      {[...Array(60)].map((e, i) => (
        <View
          key={i}
          style={{
            height: 48,
            paddingLeft: 16,
            paddingRight: 16,
            backgroundColor: "#FDE5EB",
            justifyContent: "center",
          }}
        >
          <Text>Item {i + 1}</Text>
        </View>
      ))}
    </React.Fragment>
  );

  // Bottom Sheet Header
  renderHeader = () => (
    <View style={styles.bottomSheetContainer}>
      <View style={styles.bottomSheetDraggerContainer}>
        <View style={styles.bottomSheetDragger}></View>
      </View>
      <Text style={styles.bottomSheetTitle}>Bottom Sheet Title</Text>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <BottomSheet
          ref={React.createRef()}
          snapPoints={[300, 450, "50%"]} // Bottom Sheet Position
          renderContent={this.renderInner} // Bottom Sheet Content
          renderHeader={this.renderHeader} // Bottom Sheet Header
        />
        <Text>Content Here</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  bottomSheetContainer: {
    height: 56,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  bottomSheetDraggerContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
  },
  bottomSheetDragger: {
    backgroundColor: "#D5DBE6",
    width: 32,
    height: 4,
    borderRadius: 2,
  },
  bottomSheetTitle: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "700",
    color: "#222222",
    paddingLeft: 16,
    paddingRight: 16,
  },
});
