import {StyleSheet} from 'react-native';

import {Colors} from '../../../Assets';

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: Colors.GrayBackgroundColor,
  },
  LoginBtn: {borderRadius: 28.5, marginTop: 30, width: 325, height: 57},
  txtUserName: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 25,
    color: '#000',
    letterSpacing: 0.5,
  },
  InputStyle: {
    backgroundColor: '#fff',
    borderRadius: 28.5,
    fontSize: 16,
    fontWeight: '600',
    height: 55,
  },
  ForgetPasswordBtn: {
    backgroundColor: 'transparent',
    // width: '100%',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  TitleBtn: {
    color: 'rgba(62, 62, 62, 0.8)',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default styles;
