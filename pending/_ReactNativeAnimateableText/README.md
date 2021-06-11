## Installation

```sh
yarn add react-native-animateable-text
npx pod-install
```

```tsx
import AnimateableText from 'react-native-animateable-text';

const Example: React.FC = () => {
  const text = useSharedValue('World');

  const animatedText = useDerivedValue(() => `Hello ${text.value}`);
  const animatedProps = useAnimatedProps(() => {
    return {
      text: animatedText.value,
    };
  });

  return (
    <AnimateableText
      animatedProps={animatedProps}
      // same other props as Text component
    />;
};
```