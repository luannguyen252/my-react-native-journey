import {StyleSheet} from 'react-native';

import {Colors} from '../../Assets';

const styles = StyleSheet.create({
  MainContainer: {flex: 1},
  Container: {
    flex: 1,
    backgroundColor: Colors.White,
    marginTop: 40,
  },
  Logo: {width: 60, height: 60, alignSelf: 'center', marginTop: 15},
});

export default styles;
