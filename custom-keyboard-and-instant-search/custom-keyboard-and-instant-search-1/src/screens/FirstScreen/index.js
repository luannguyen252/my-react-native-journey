import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import globalStyles from "../../assets/styles/globalStyles";
import { SwipeableTabView } from "./components";
import { search } from "./filter";
import { SearchDefault, SearchNoData } from "./results/";
import styles from "./styles";

/* BEGIN: Mặc định cho kết quả tìm kiếm */
const defaultData = {
  dichVuTimThay: [],
  danhBaTimThay: [],
  thietLapTimThay: [],
  troChuyenTimThay: [],
  giaoDichMauTimThay: [],
};
/* END: Mặc định cho kết quả tìm kiếm */

export default function FirstScreen() {
  const [text, setText] = useState("");
  const [coTimThay, setCoTimThay] = useState(false);
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const data = search(text);
      /* BEGIN: Lưu kết quả tìm kiếm vào state  */
      setData(data);
      /* END: Lưu kết quả tìm kiếm vào state  */

      /* BEGIN: Tồn tại một hạng mục với số lượng phần tử lớn hơn 1 sẽ xác định là có dữ liệu  */
      setCoTimThay(
        data.dichVuTimThay.length > 0 ||
          data.danhBaTimThay.length > 0 ||
          data.thietLapTimThay.length > 0 ||
          data.troChuyenTimThay.length > 0 ||
          data.giaoDichMauTimThay.length > 0
      );
      /* END: Tồn tại một hạng mục với số lượng phần tử lớn hơn 1 sẽ xác định là có dữ liệu  */

      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <View style={globalStyles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />

        {/* BEGIN: Search Input */}
        <View style={styles.searchInputContainter}>
          <TextInput
            style={styles.searchInput}
            placeholder="Chuyển tiền, tiền điện, tiền nước,..."
            autoFocus={true}
            value={text}
            onChangeText={(value) => {
              setText(value);
              setData(defaultData); //Khi đang gõ thì đặt dữ liệu mặc định
              setLoading(true);
            }}
          />
          <Image
            style={styles.searchInputSearchIcon}
            source={require("./assets/ic_search_32_dark40.png")}
          />
          {text != "" && loading ? (
            <ActivityIndicator
              style={styles.loadingInputIndicator}
              color={"gray"}
            />
          ) : null}

          {text != "" && !loading ? (
            <TouchableOpacity
              style={styles.clearInputAction}
              onPress={() => setText("")}
            >
              <Image
                style={styles.clearInputActionIcon}
                source={require("./assets/ic_close_24_dark40.png")}
              />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* END: Search Input */}

        {/* BEGIN: Swipeable Tab hiển thị các Section được tìm kiếm ở đây */}
        {text !== "" && coTimThay && !loading && (
          <SwipeableTabView data={data} />
        )}
        {/* END: Swipeable Tab hiển thị các Section được tìm kiếm ở đây */}

        {/* BEGIN: Search Results */}
        {(text === "" || (text !== "" && !coTimThay)) && !loading && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContainer}
          >
            {/* BEGIN: Search Default Screen */}
            {/* 1. Khi vào màn tìm kiếm thì load kết quả là Default */}
            {text === "" && <SearchDefault />}

            {/* 2. Khi tìm kiếm trong quá trình query từ khóa nếu không có kết quả phù hợp sẽ hiển thị kết quả là No Data */}
            {/* {text !== "" && coTimThay && <SearchHaveData data={data} />} */}

            {/* 3. Khi tìm kiếm trong quá trình query từ khóa nếu có kết quả phù hợp sẽ hiển thị kết quả là Have Data */}
            {text !== "" && !coTimThay && <SearchNoData queryName={text} />}

            {/* END: Search Default Screen */}
          </ScrollView>
        )}
        {/* END: Search Results */}
      </SafeAreaView>
    </View>
  );
}
