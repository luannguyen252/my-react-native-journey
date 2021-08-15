## Install

```shell
yarn add react-native-mask-text
```

## Custom Mask

Pattern used in masked components:

- `9` - accept digit.
- `A` - accept alpha.
- `S` - accept alphanumeric.

Ex: AAA-9999

### Usage MaskedTextInput (custom)

Component similar with `<TextInput />` but with custom mask option.

```jsx
import { StyleSheet } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

//...

<MaskedTextInput
  mask="AAA-9999"
  onChangeText={(text, rawText) => {
    console.log(text);
    console.log(rawText);
  }}
  style={styles.input}
/>;

//...

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
```

### Usage MaskedText (custom)

Component similar with `<Text />` but with custom mask option.

```jsx
import { MaskedText } from "react-native-mask-text";

//...

<MaskedText mask="99/99/9999">30081990</MaskedText>;
```

## Currency Mask

These options only are used if you use prop `type="currency"` in your component:

| Option                 | Type   | Mandatory | Default Value | Description                                 |
| ---------------------- | ------ | --------- | ------------- | ------------------------------------------- |
| prefix                 | string | No        | null          | String to prepend                           |
| decimalSeparator       | string | No        | null          | Separation for decimals                     |
| groupSeparator         | string | No        | null          | Grouping separator of the integer part      |
| precision              | number | No        | 0             | Precision for fraction part (cents)         |
| groupSize              | number | No        | 3             | Primary grouping size of the integer part   |
| secondaryGroupSize     | number | No        | null          | Secondary grouping size of the integer part |
| fractionGroupSeparator | string | No        | null          | Grouping separator of the fraction part     |
| fractionGroupSize      | number | No        | null          | Grouping size of the fraction part          |
| suffix                 | string | No        | null          | String to append                            |

### Usage MaskedTextInput (currency)

Component similar with `<TextInput />` but with currency mask option.

```jsx
import { StyleSheet } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

//...

<MaskedTextInput
  type="currency"
  options={{
    prefix: "$",
    decimalSeparator: ".",
    groupSeparator: ",",
    precision: 2,
  }}
  onChangeText={(text, rawText) => {
    console.log(text);
    console.log(rawText);
  }}
  style={styles.input}
  keyboardType="numeric"
/>;

//...

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
```

### Usage MaskedText (currency)

Component similar with `<Text />` but with currency mask option.

```jsx
import { MaskedText } from "react-native-mask-text";

//...

<MaskedText
  type="currency"
  options={{
    prefix: "$",
    decimalSeparator: ".",
    groupSeparator: ",",
    precision: 2,
  }}
>
  5999
</MaskedText>;
```

## Usage `mask` function

Function used to mask text.

```js
import { mask } from "react-native-mask-text";

const code = mask("ABC1234", "AAA-9999"); // return ABC-1234
```

## Usage `unMask` function

Function used to remove text mask.

```js
import { unMask } from "react-native-mask-text";

const code = unMask("ABC-1234"); // return ABC1234
```
