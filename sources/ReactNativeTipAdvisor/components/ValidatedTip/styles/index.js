import phone from "./phone";
import tablet from "./tablet";
import Device from "react-native-device-detection";
export default (Device.isTablet ? tablet : phone);
