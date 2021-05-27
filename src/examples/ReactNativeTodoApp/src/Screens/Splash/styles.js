import {StyleSheet} from 'react-native';

import {Colors} from '../../Assets';

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: Colors.MainColor,
    justifyContent: 'center',
  },
  Logo: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    marginTop: 15,
    resizeMode: 'contain',
  },
});

export default styles;
