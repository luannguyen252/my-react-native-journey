import {StyleSheet} from 'react-native';

import {Colors} from '../../Assets';

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: Colors.SecondRelativeMainColor,
  },
  txtUserName: {
    fontSize: 19,
    fontWeight: 'bold',
    lineHeight: 30,
    marginStart: 25,
    color: Colors.White,
    letterSpacing: 0.5,
    marginEnd: 25,
  },
  ContainerTodayTask: {
    marginTop: 15,
    flexDirection: 'row',
    marginStart: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TodayTasks: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 30,
    color: Colors.SecondRelativeMainColor,
    letterSpacing: 0.5,
  },
  FloatingBtn: {
    marginTop: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.RelativeMainColor,
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 5,
  },
  ViewTaskBtn: {
    marginTop: 0,
    backgroundColor: 'transparent',
    marginEnd: 25,
  },
});

export default styles;
