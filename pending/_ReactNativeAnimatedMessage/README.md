```js
import Message from 'react-native-animated-message';

<View style={styles.container}>
  <Button 
    title="Show top"
    onPress={()=> this.message.showMessage('This is a message', 3000)}
  />
  <Message
    ref={(message) => this.message = message }
    animation={'slideX'}
    position={'top'}>
  </Message>
</View>
```

## Method
- <b>showMessage</b>(<b>`message`</b>: *string*, <b>`duration`</b>: *number*)
## Props
|  Prop | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| animation | slideX | `string` | Animation for message (`slideX`, `slideY` or `zoom`) |
| position | top | `string` | Determine the position of message (`top`, `center` or `bottom`)
| messageHeight | 60 | `number` | The height of message
| textStyle | {color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center'} | `style` | Style for message text
| messageStyle | {backgroundColor: 'green'} | `style` | Style applied to the message
