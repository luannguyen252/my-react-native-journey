import { View as NativeView, Button, Text, StyleSheet } from 'react-native'
import React from 'react'
import * as Moti from 'moti'

export default function AnimatedStyleUpdateExample() {
  const box = Moti.useAnimationState({
    from: {
      width: 100,
      height: 100,
      opacity: 0.2,
    },
    open: {
      width: 300,
      height: 300,
      opacity: 1,
    },
  })

  return (
    <NativeView style={styles.container}>
      {/* <Moti.View
        style={styles.box}
        transition={{
          type: 'spring',
        }}
        state={box}
      >
        <Text style={styles.text}>Animator</Text>
      </Moti.View> */}
      <Moti.View
        style={styles.box}
        transition={{
          type: 'spring',
          scale: {
            type: 'timing',
          },
        }}
        from={{
          scale: 0.9,
          translateY: -10,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
          scale: [1, 1.1, 1.2, 1.1, 1.2, 1.3],
        }}
      >
        <Text style={styles.text}>Style Props</Text>
      </Moti.View>
      <Button
        title="toggle"
        onPress={() => {
          const state = box.current
          if (state === 'open') {
            box.transitionTo('from')
          } else {
            box.transitionTo('open')
          }
        }}
      />
    </NativeView>
  )
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    alignSelf: 'center',
    color: 'hotpink',
  },
  box: {
    justifyContent: 'center',
    backgroundColor: 'blue',
    height: 100,
    width: 100,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
})
