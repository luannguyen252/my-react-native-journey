```javascript
  import ReactNativeHaptic from 'react-native-haptic';

  <TouchableHighlight style={styles.wrapper} onPress={() => ReactNativeHaptic.generate('notification')}>
```

## Methods

```javascript
  /**
   * @static
   * @method prepare
   * @description Prepares the Taptic Engine (Awaken state). Usually used seconds before triggering a feedback.
   * This is optional, mostly used when the feedback needs to be synced with sound.
   *
   */

    static prepare() {
      ReactNativeHaptic.prepare();
    }

  /**
   * @static
   * @method Generate
   * @description Triggers haptic feedback of type :type
   * @param type Type of haptic feedback
   */

    static generate(type: 'impact' | 'notification' | 'selection' | 'impactLight' | 'impactMedium' | 'impactHeavy' | 'notificationError' | ' notificationSuccess' | 'notificationWarning') {
      ReactNativeHaptic.generate(type);
    }
```
