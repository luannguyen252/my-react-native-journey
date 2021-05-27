// From: https://github.com/nomi9995/react-native-bottomsheet-reanimated
import React from "react";
import { View, Text } from "react-native";
import BottomSheet from "react-native-bottomsheet-reanimated";

export default class ReactNativeBottomSheetReanimatedExample1 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BottomSheet
          bottomSheerColor="#FFFFFF"
          ref="BottomSheet"
          initialPosition={"50%"} //200, 300
          snapPoints={["50%", "100%"]}
          isBackDrop={true}
          isBackDropDismisByPress={true}
          isRoundBorderWithTipHeader={true}
          // backDropColor="red"
          // isModal
          // containerStyle={{backgroundColor:"red"}}
          // tipStyle={{backgroundColor:"red"}}
          // headerStyle={{backgroundColor:"red"}}
          // bodyStyle={{backgroundColor:"red",flex:1}}
          header={
            <View>
              <Text style={styles.text}>Header</Text>
            </View>
          }
          body={
            <View style={styles.body}>
              <Text style={styles.text}>Body</Text>
            </View>
          }
        />
      </View>
    );
  }
}
