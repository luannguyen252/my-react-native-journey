import * as React from "react";
import { WebView } from "react-native-webview";

export default class WebViewHTMLExample extends React.Component {
  render() {
    return (
      <WebView
        originWhitelist={["*"]}
        source={{ html: "<h1>Hello world</h1>" }}
        style={{ marginTop: 20 }}
      />
    );
  }
}
