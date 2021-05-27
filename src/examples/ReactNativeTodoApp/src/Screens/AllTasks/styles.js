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
  ContainerAllTask: {
    marginTop: 15,
    flexDirection: 'row',
    marginStart: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.Black,
    borderBottomWidth: 0.5,
  },
  AllTasks: {
    fontSize: 19,
    fontWeight: 'bold',
    lineHeight: 30,
    color: Colors.SecondRelativeMainColor,
    letterSpacing: 0.5,
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
  TitleBtn: {
    fontSize: 16,
    color: '#3E3E3E',
    marginStart: 27,
    fontWeight: '600',
    flex: 1,
    textAlign: 'left',
  },
  ContainerBtn: {
    backgroundColor: '#fff',
    marginStart: '5%',
    marginEnd: '5%',
    marginTop: 25,
    height: 64,
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    marginTop: '10%',
  },
  Modal: {
    backgroundColor: '#FAFAFA',
    marginTop: '10%',
    borderRadius: 20,
  },
  ModalHeadr: {
    width: '40%',

    height: 8,
    backgroundColor: Colors.RelativeMainColor,
    borderRadius: 20,
  },
  ContainerTasks: {
    backgroundColor: '#E6EFF6',
    flex: 1,
    borderTopRightRadius: 50,
  },
});

export default styles;
