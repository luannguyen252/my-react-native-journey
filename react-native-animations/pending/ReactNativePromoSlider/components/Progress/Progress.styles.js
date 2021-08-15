import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  progress: {
    height: 20,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  activeDot: {
    width: 6,
    height: 6,
    backgroundColor: '#000',
    position: 'absolute',
    zIndex: 2,
    left: 0,
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: '#000',
    opacity: 0.25,
  },
});

export default styles;
