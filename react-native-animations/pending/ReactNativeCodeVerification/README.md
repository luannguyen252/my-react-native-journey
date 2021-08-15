### Props

| Name               |   Type   | Description                                                | Default                        |
| ------------------ | :------: | ---------------------------------------------------------- | ------------------------------ |
| `descriptionText`  |  String  | A description text                                         | Please enter pincode for entry |
| `spaceColor`       |  Color   | Color of line under digit                                  | #FF0000                        |
| `closeButtonColor` |  Color   | Color of X - close button                                  | #FF0000                        |
| `onEnteredPincode` | Function | A function that returns entered code                       | -                              |
| `onCloseView`      | Function | On press close button, will be useful to close view        | -                              |
| `onPressTouchId`   | Function | Touch Id is not available, but you can make it by yourself | -                              |
| `withTouchId`      | Boolean  | If you do not neet touch id, you can set it to false       | TRUE                           |

```javascript
import Pincode from 'react-native-code-verification';

// TODO: What to do with the module?
class Example extends Component {
  public render() {
    return (
      <View style={styles.container}>
        <Pincode onEnteredPincode={pin => this.onDetectPin(pin)} />
      </View>
    );
  }
  private onDetectPin = pin => {
    console.log('pinCode>>>', pin);
  };
}
```
