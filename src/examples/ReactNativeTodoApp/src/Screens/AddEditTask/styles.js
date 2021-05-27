import {StyleSheet, Dimensions} from 'react-native';

import {Colors} from '../../Assets';

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: Colors.GrayBackgroundColor,
  },
  MainContainerHeaderDate: {
    backgroundColor: Colors.SecondRelativeMainColor,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    elevation: 20,
  },
  ContainerSelectDate: {marginStart: 15, flex: 1, alignItems: 'center'},
  SelectDateTxt: {
    color: Colors.GrayBackgroundColor,
    letterSpacing: 0.8,
    fontSize: 18,
  },
  Day: {
    color: '#fff',
    letterSpacing: 0.8,
    fontSize: 14,
  },
  ContainerIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  DueDate: {
    marginStart: 15,
    marginEnd: 15,
    flex: 1,
    alignItems: 'center',
  },
  MainContainerAddTask: {
    backgroundColor: '#E6EFF6',
    flex: 1,
    height: height / 2,
    borderTopRightRadius: 45,
  },
  AddTaskTxt: {
    marginTop: 25,
    marginStart: 25,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  AddTaskBtn: {
    backgroundColor: Colors.MainColor,
    width: '20%',
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    marginEnd: 25,
  },
  TitleBtn: {
    color: Colors.GrayBackgroundColor,
    fontSize: 14,
  },
  InputTaskName: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: Colors.White,
    width: '90%',
    marginStart: 0,
    marginEnd: 0,
    alignSelf: 'center',
  },
  InputTaskContent: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: Colors.White,
    width: '90%',
    marginStart: 0,
    marginEnd: 0,
    alignSelf: 'center',
    flex: 1,
    marginTop: 15,
  },
});

export default styles;
