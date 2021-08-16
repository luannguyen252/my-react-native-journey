import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 64,
  },
  searchInputContainter: {
    position: "relative",
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  searchInput: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    height: 48,
    paddingTop: 0,
    paddingLeft: 48,
    paddingRight: 16,
    paddingBottom: 0,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
  },
  searchInputSearchIcon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    position: "absolute",
    top: 8,
    left: 8,
    zIndex: 1,
  },
  clearInputAction: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1,
  },
  clearInputActionIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  loadingInputIndicator: {
    position: "absolute",
    zIndex: 1,
    width: 24,
    height: 24,
    top: 12,
    right: 12,
  },
  headlineWithAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabItemViewContainer: {
    // borderBottomWidth: 2, //Loại bỏ vì sử dụng border của thư viện vì phục vụ cho việc kéo left-right
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    height: 48,
  },
  tabItemViewText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
  },
  headlineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 16,
  },
});

export default styles;
