import { StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '../../utils';

const styles = StyleSheet.create({
  slide: {
    width: SCREEN_WIDTH,
  },
  closeButton: {
    position: 'absolute',
    zIndex: 2,
    right: 5,
    top: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 30,
    color: 'rgba(0, 0, 0, 0.5)',
  },
});

export default styles;
