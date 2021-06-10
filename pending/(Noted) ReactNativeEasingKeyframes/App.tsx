import React, { useEffect } from 'react'
import { StyleSheet, View, Animated, Easing, StatusBar } from 'react-native'
import keyframes from 'react-native-easing-keyframes'

export default function App() {
  const [value] = React.useState(new Animated.Value(0))
  const [animation] = React.useState(
    Animated.loop(
      Animated.timing(value, {
        duration: 1200,
        toValue: 100,
        easing: keyframes({
          keyframes: [0, 50, 100],
          easing: Easing.bezier(0.42, 0.0, 0.58, 1.0),
        }),
        useNativeDriver: true,
      })
    )
  )

  useEffect(() => {
    animation.start()

    return () => {
      value.setValue(0)
      animation.stop()
    }
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.View
        style={[
          styles.plane,
          {
            transform: [
              {
                perspective: 48 * 3,
              },
              {
                rotateX: value.interpolate({
                  inputRange: [0, 50, 100],
                  outputRange: ['0.1deg', '-179.9deg', '-179.9deg'],
                }),
              },
              {
                rotateY: value.interpolate({
                  inputRange: [0, 50, 100],
                  outputRange: ['0.1deg', '0.1deg', '-179.9deg'],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d35400',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plane: {
    width: 48,
    height: 48,
    backgroundColor: '#fff',
  },
})
