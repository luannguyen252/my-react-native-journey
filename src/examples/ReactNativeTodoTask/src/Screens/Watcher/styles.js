import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  MainContainer: {flex: 1},
  LastTimeTxt: {fontSize: 16, fontWeight: 'bold', margin: 15},
  TaskNameInput: {
    width: width * 0.8,
    height: 40,
    alignSelf: 'center',
    backgroundColor: '#F3F3F3',
    color: '#000',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  TimerTxt: {fontSize: 16, fontWeight: 'bold', margin: 15},
  ContianerStartStopBtns: {
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 20,
  },
  SubContainerBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  StartBtn: {
    backgroundColor: '#18CC04',
    width: width * 0.3,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: 10,
    marginEnd: 10,
    borderRadius: 8,
  },
  StartBtnTxt: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  StopBtn: {
    backgroundColor: '#FB3E29',
    width: width * 0.3,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: 10,
    marginEnd: 10,
    borderRadius: 8,
  },
  StopBtnTxt: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default styles;
