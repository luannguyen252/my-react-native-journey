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
  AddTaskBtn: {
    backgroundColor: Colors.MainColor,
    width: '80%',
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    marginEnd: '25%',
    marginStart: '25%',
  },
  TitleBtn: {
    color: Colors.GrayBackgroundColor,
    fontSize: 14,
  },
  ModalHeadr: {
    width: '40%',
    height: 8,
    backgroundColor: Colors.RelativeMainColor,
    borderRadius: 20,
  },
  containerContent: {flex: 1, marginTop: 40},
  containerHeader: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: Colors.SecondRelativeMainColor,
    borderTopRightRadius: 50,
  },
  headerContent: {
    marginTop: '18%',
  },
  Modal: {
    backgroundColor: '#FAFAFA',
    marginTop: '18%',
    borderRadius: 20,
  },
  RetrieveTasksTxt: {
    marginStart: 25,
    marginTop: 15,
    color: Colors.SecondRelativeMainColor,
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 32,
    textDecorationLine: 'underline',
  },
  To: {
    fontSize: 17,
    letterSpacing: 0.8,
    fontWeight: 'bold',
  },
  From: {
    fontSize: 17,
    letterSpacing: 0.8,
    fontWeight: 'bold',
  },
  ContainerTOFROM: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 8,
  },
});

export default styles;
