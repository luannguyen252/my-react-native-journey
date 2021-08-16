import React from "react";
import { Image, Text, View } from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import styles from "../styles";

export default function SearchNoData({ queryName }) {
  return (
    <View style={styles.centerContainer}>
      <Image
        style={{
          width: 300,
          height: 225,
          resizeMode: "contain",
          paddingBottom: 16,
        }}
        source={require("../assets/il_no_data.png")}
      />
      <Text
        style={[
          globalStyles.subTitle,
          { textAlign: "center", paddingBottom: 16 },
        ]}
      >
        Không tìm thấy kết quả phù hợp
      </Text>
      <Text
        style={[
          globalStyles.bodyText,
          { textAlign: "center", color: "#7A7A7A" },
        ]}
      >
        Dường như chúng tôi không tìm thấy kết quả tìm kiếm với từ khóa{" "}
        {queryName} của bạn.
      </Text>
    </View>
  );
}
