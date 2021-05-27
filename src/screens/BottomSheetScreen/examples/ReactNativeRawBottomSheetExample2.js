import React, { useRef } from "react";
import { View, Button, Text } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

export default function ReactNativeRawBottomSheetExample2() {
  const refRBSheet = useRef();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <Button
        title="OPEN BOTTOM SHEET"
        onPress={() => refRBSheet.current.open()}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          },
          draggableIcon: {
            backgroundColor: "rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        <View
          style={{
            paddingTop: 16,
            paddingLeft: 16,
            paddingRight: 16,
            paddingBottom: 16,
          }}
        >
          <Text style={{ textAlign: "center" }}>
            Functional React Native Raw Bottom Sheet
          </Text>
        </View>
      </RBSheet>
    </View>
  );
}
