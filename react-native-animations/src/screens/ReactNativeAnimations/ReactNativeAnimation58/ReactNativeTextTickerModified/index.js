import React, { PureComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import TextTicker from "./TextTicker/";
import colors from "../../../../assets/styles/colors";

const { width, height } = Dimensions.get("screen");

export default class ReactNativeTextTickerModified extends PureComponent {
  renderTresholdExample = () => {
    const overlayWidth = 40;
    const text =
      "This fits but there's this view at the right obstrucating the end.";
    const example1 = "shouldAnimateTreshold={0} (default value):";
    const example2 = "shouldAnimateTreshold={40} (width of obstrucating view):";
    const example3 = "shouldAnimateTreshold={40} bounce={false}:";

    return (
      <View>
        {/* <View style={[styles.shouldAnimateTresholdContainer]}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              lineHeight: 22,
              color: colors.coolGray900,
            }}
          >
            examples for the{" "}
            <Text style={{ fontWeight: "bold" }}>shouldAnimateTreshold</Text>{" "}
            prop:
          </Text>
        </View> */}
        {/* <Text
          style={{
            fontSize: 16,
            lineHeight: 22,
            fontWeight: "700",
            color: colors.coolGray900,
          }}
        >
          {example1}
        </Text> */}
        <View style={[styles.shouldAnimateTresholdContainer]}>
          <TextTicker style={{}}>{text}</TextTicker>
          {/* <View
            style={[
              styles.overlayView,
              { width: overlayWidth, backgroundColor: "red" },
            ]}
          /> */}
        </View>
        {/* <Text
          style={{
            fontSize: 16,
            lineHeight: 22,
            fontWeight: "700",
            color: colors.coolGray900,
          }}
        >
          {example2}
        </Text> */}
        <View style={[styles.shouldAnimateTresholdContainer]}>
          <TextTicker style={{}} shouldAnimateTreshold={overlayWidth}>
            {text}
          </TextTicker>
          {/* <View
            style={[
              styles.overlayView,
              { width: overlayWidth, backgroundColor: "green" },
            ]}
          /> */}
        </View>
        {/* <Text
          style={{
            fontSize: 16,
            lineHeight: 22,
            fontWeight: "700",
            color: colors.coolGray900,
          }}
        >
          {example3}
        </Text> */}
        <View style={[styles.shouldAnimateTresholdContainer]}>
          <TextTicker
            style={{}}
            bounce={false}
            shouldAnimateTreshold={overlayWidth}
          >
            {text}
          </TextTicker>
          {/* <View
            style={[
              styles.overlayView,
              { width: overlayWidth, backgroundColor: "green" },
            ]}
          /> */}
        </View>
      </View>
    );
  };

  render() {
    const Spacer = () => <View style={styles.spacer} />;
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: width - 32,
            paddingBottom: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => this.marqueeRef.startAnimation()}
            style={{
              backgroundColor: colors.violet600,
              paddingLeft: 16,
              paddingRight: 16,
              justifyContent: "center",
              alignItems: "center",
              height: 48,
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: colors.white,
                fontSize: 16,
                lineHeight: 22,
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Start Animation
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.marqueeRef.stopAnimation()}
            style={{
              backgroundColor: colors.rose600,
              paddingLeft: 16,
              paddingRight: 16,
              justifyContent: "center",
              alignItems: "center",
              height: 48,
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: colors.white,
                fontSize: 16,
                lineHeight: 22,
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Stop Animation
            </Text>
          </TouchableOpacity>
        </View>
        <TextTicker
          style={{}}
          marqueeOnMount={false}
          ref={(c) => (this.marqueeRef = c)}
        >
          Super long piece of text is long. The quick brown fox jumps over the
          lazy dog.
        </TextTicker>
        <Spacer />
        <TextTicker
          style={{}}
          onMarqueeComplete={() => console.log("Scroll Completed!")}
        >
          Super long piece of text is long. The quick brown fox jumps over the
          lazy dog.
        </TextTicker>
        <Spacer />
        <TextTicker style={{}}>
          This fits in its container and wont scroll
        </TextTicker>
        <Spacer />
        <TextTicker style={{}}>
          This is an example that's only slightly longer so it bounces sides
        </TextTicker>
        <Spacer />
        {this.renderTresholdExample()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: {
    // width: "85%",
    marginBottom: 24,
  },
  overlayView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    opacity: 0.8,
  },
  shouldAnimateTresholdContainer: {
    // marginBottom: 24,
    height: 24,
  },
});
