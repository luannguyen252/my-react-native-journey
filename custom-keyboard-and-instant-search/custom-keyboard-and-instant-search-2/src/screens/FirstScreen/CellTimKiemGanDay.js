import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";

export default function CellTimKiemGanDay({ route, name }) {
  const [show, setShow] = useState(false);

  return (
    <>
      {show ? null : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{ paddingBottom: 16 }}
            activeOpacity={0.8}
            onPress={route}
          >
            <Text style={globalStyles.bodyText}>{name} →</Text>
          </TouchableOpacity>

          {/* BEGIN: Delete Action */}
          <TouchableOpacity
            style={{ paddingBottom: 16 }}
            activeOpacity={0.8}
            onPress={() => setShow(show === false)}
          >
            <Text style={[globalStyles.bodyText, { color: "#EE0033" }]}>
              Xóa
            </Text>
          </TouchableOpacity>
          {/* END: Delete Action */}
        </View>
      )}
    </>
  );
}
