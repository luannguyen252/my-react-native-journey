import React, { useRef } from "react";
import { Dimensions } from "react-native";
import ScrollableTabView, {
  ScrollableTabBar,
} from "react-native-scrollable-tab-view";
import { SearchHaveData } from "../results";
import TabItemView from "./TabItemView";

const windowWidth = Dimensions.get("window").width;

export default function SwipeableTabView(props) {
  const scrollableTabView = useRef(null);

  return (
    <ScrollableTabView
      ref={scrollableTabView}
      prerenderingSiblingsNumber={Infinity} //Render tất cả các tab => mịn hơn khi cuộn left-right
      contentProps={{
        keyboardShouldPersistTaps: "always", //Cho phép các thành phần con có thể tương tác được
      }}
      renderTabBar={(e) => {
        const tabCount = e.tabs.length;
        return (
          /* BEGIN: Sử dụng khung scrollview của thư viện react-native-scrollable-tab-view để có thể tự động scroll khi bấm vào một tab */
          <ScrollableTabBar
            nestedScrollEnabled
            underlineStyle={{ backgroundColor: "#EE0033" }}
            renderTab={(
              name,
              page,
              isTabActive,
              onPressHandler,
              onLayoutHandler
            ) => {
              return (
                <TabItemView
                  key={name}
                  name={name}
                  // amount={10}
                  isActive={isTabActive}
                  onPress={() => {
                    onPressHandler(page);
                  }}
                  onLayoutHandler={onLayoutHandler} // Truyền onLayout của TabItemView cho thư viện xử lý
                  additionalStyle={
                    tabCount == 2 ? { width: windowWidth / 2 } : {}
                  }
                />
              );
            }}
          />
          /* END: Sử dụng khung scrollview của thư viện react-native-scrollable-tab-view để có thể tự động scroll khi bấm vào một tab */
        );
      }}
    >
      {/* BEGIN: Truyền các màn hình với dữ liệu tương ứng với từng tab để thư viện render trước, phục vụ cho việc kéo left-right không tính toán lại */}
      <SearchHaveData
        data={props.data}
        tabLabel="Tất cả"
        goToTab={(index) => {
          scrollableTabView?.current?.goToPage(index);
        }}
      />

      {!!props.data?.dichVuTimThay?.length && (
        <SearchHaveData
          data={{ dichVuTimThay: props.data.dichVuTimThay }} // chỉ truyền dichVuTimThay, những phần còn lại sẽ undefine và chúng sẽ không đc hiển thị
          tabLabel={`Dịch vụ (${props.data.dichVuTimThay.length})`}
          dontShowSeeMore={true}
        />
      )}

      {!!props.data?.danhBaTimThay?.length && (
        <SearchHaveData
          data={{ danhBaTimThay: props.data.danhBaTimThay }} // chỉ truyền danhBaTimThay, những phần còn lại sẽ undefine và chúng sẽ không đc hiển thị
          tabLabel={`Danh bạ (${props.data.danhBaTimThay.length})`}
          dontShowSeeMore={true}
        />
      )}

      {!!props.data?.thietLapTimThay?.length && (
        <SearchHaveData
          data={{ thietLapTimThay: props.data.thietLapTimThay }} // chỉ truyền thietLapTimThay, những phần còn lại sẽ undefine và chúng sẽ không đc hiển thị
          tabLabel={`Thiết lập (${props.data.thietLapTimThay.length})`}
          dontShowSeeMore={true}
        />
      )}

      {!!props.data?.troChuyenTimThay?.length && (
        <SearchHaveData
          data={{ troChuyenTimThay: props.data.troChuyenTimThay }} // chỉ truyền troChuyenTimThay, những phần còn lại sẽ undefine và chúng sẽ không đc hiển thị
          tabLabel={`Trò chuyện (${props.data.troChuyenTimThay.length})`}
          dontShowSeeMore={true}
        />
      )}

      {!!props.data?.giaoDichMauTimThay?.length && (
        <SearchHaveData
          data={{ giaoDichMauTimThay: props.data.giaoDichMauTimThay }} // chỉ truyền giaoDichMauTimThay, những phần còn lại sẽ undefine và chúng sẽ không đc hiển thị
          tabLabel={`Giao dịch mẫu (${props.data.giaoDichMauTimThay.length})`}
          dontShowSeeMore={true}
        />
      )}
      {/* END: Truyền các màn hình với dữ liệu tương ứng với từng tab để thư viện render trước, phục vụ cho việc kéo left-right không tính toán lại */}
    </ScrollableTabView>
  );
}
