/* @flow */
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  item: {
    height: 38,
    flex: 1
  },
  selected: {
    borderBottomColor: 'rgba(255, 255, 255, 0.25)',
    borderBottomWidth: 3
  },
  text: {
    color: 'rgba(255, 255, 255, 0.25)',
    textAlign: 'center',
    fontSize: 16
  },
  selectedText: {
    color: 'rgba(255, 255, 255, 0.5)'
  },
  border: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    position: 'absolute',
    bottom: 0,
    left: 0
  }
})

export default styles
