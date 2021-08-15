```javascript
import RNDownloadButton from "react-native-download-button";

// TODO: What to do with the module?
<RNDownloadButton
  size={300}
  progress={this.state.progress}
  reset={this.state.reset}
  onPress={this._onPress}
/>;
```

| Prop                       | Type     | Default | Note                                        |
| -------------------------- | -------- | ------- | ------------------------------------------- |
| `startAnimation`           | `bool`   |         | To start the downloader animation           |
| `progress`                 | `int`    |         | Set the progress of downloader progress bar |
| `reset`                    | `bool`   |         | Reset the downloader to it's inital state   |
| `iOS: tintColor`           | `string` |         | Color for setting tint color                |
| `iOS: tickColor`           | `string` |         | Color for setting tick color                |
| `android: backgroundColor` | `string` |         | Color for setting background color          |
