## Basic Usage

```javascript
import RadioButton from "react-native-customizable-radio-button";

const options = [
  {
    id: 1, // required
    text: "Most High Pay", //required
  },
  {
    id: 2,
    text: "Most Perfomance",
  },
];

export default class reactNativeRadioButtonForm extends Component {
  onValueChange = (item) => {
    console.log(item);
  };

  render() {
    return (
      <RadioButton
        data={options} //required
        onValueChange={this.onValueChange.bind(this)} //required
      />
    );
  }
}
```

## Advanced Usage

```javascript
//...
import RadioButton from "react-native-customizable-radio-button";

const options = [
  {
    id: 1, // required
    text: "Most High Pay", //required
  },
  {
    id: 2,
    text: "Most Perfomance",
  },
];

export default class reactNativeRadioButtonForm extends Component {
  onValueChange = (item) => {
    console.log(item);
  };

  render() {
    return (
      <RadioButton
        // defaultOption={id} // you may input the selected option as default. When not marked, first is always selected
        // formStyle = {{}} // add your styles to whole form container
        // containerStyle={{}} // add your styles to each item container
        // circleContainerStyle={{}} // add your styles to each outer circle
        // innerCircleStyle={{}} // add your styles to each inner circle
        // labelStyle={{}} // add your styles to each label
        // isContainerClickable={false} // default false, when true whole item container changes value
        data={options} //required
        onValueChange={this.onValueChange.bind(this)} //required
      />
    );
  }
}
```
