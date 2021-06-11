## Installation
NPM
```bash
npm install react-native-animated-hamburger --save
```

Yarn
```bash
yarn add react-native-animated-hamburger
```

## Usage
```javascript
...
import Hamburger from 'react-native-animated-hamburger';
...
<Hamburger type="cross" active={this.state.active} onPress={() => {
              this.setState({ active: !this.state.active })
          }}
          underlayColor="transparent"
          >
 </Hamburger>
```

## Props
| Prop    | Description                                                               | Typ      | Default   |
|---------|---------------------------------------------------------------------------|----------|-----------|
| type    | Type of Animation. &nbsp;&nbsp;&nbsp; Available types: {**arrow, spinArrow, cross, spinCross**} | String   | cross     |
| onPress | Called when the hamburger gets pressed                                    | Function | undefined |
| active  | Determines the activation state of Hamburger.                             | Boolean  | false     |