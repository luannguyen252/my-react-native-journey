## Fundamental Usage

```jsx
<RNMonthly numberOfDays={31} activeDays={[1, 5, 6, 11, 21, 31]} />
```

```jsx
<RNMonthly
  numberOfDays={30}
  activeBackgroundColor="green"
  inactiveBackgroundColor="#E6FFDE"
  activeDays={[1, 5, 6, 11, 21, 31]}
/>
```

```jsx
<RNMonthly
  numberOfDays={28}
  activeBackgroundColor="#9C1818"
  inactiveBackgroundColor="#FFDEDE"
  activeDays={[1, 5, 6, 11, 21, 31]}
/>
```

## Example Project 😍

You can checkout the example project 🥰

Simply run

- `npm i`
- `react-native run-ios/android`

should work of the example project.

# Configuration - Props

## Fundamentals

| Property     |   Type    |  Default  | Description                                                         |
| ------------ | :-------: | :-------: | ------------------------------------------------------------------- |
| numberOfDays |  number   |    31     | change days of the month it should be more than 28 and less than 31 |
| activeDays   | number[]  | undefined | set the active days                                                 |
| style        | ViewStyle |  default  | set or override the style object for the main container             |
| today        |  number   | undefined | enable the today's selected item or any other                       |

## Customization (Optionals)

| Property                |   Type    |  Default  | Description                                                        |
| ----------------------- | :-------: | :-------: | ------------------------------------------------------------------ |
| activeBackgroundColor   |   color   | "#49c1c2" | change the active background color                                 |
| inactiveBackgroundColor |   color   | "#f0f0f0" | change the inactive background color                               |
| todayTextStyle          | TextStyle |  default  | set or override the style object for the today text style          |
| itemContainerStyle      | ViewStyle |  default  | set or override the style object for the each item container       |
| onPress                 | function  | undefined | set your own logic for the button functionality when it is pressed |
