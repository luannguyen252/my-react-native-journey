import * as React from "react";
import { WebView } from "react-native-webview";

export default class WebViewExample extends React.Component {
  render() {
    return (
      <WebView source={{ uri: "https://expo.io" }} style={{ marginTop: 20 }} />
    );
  }
}
