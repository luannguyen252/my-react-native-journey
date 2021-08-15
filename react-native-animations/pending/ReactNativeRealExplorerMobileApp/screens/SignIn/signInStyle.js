import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  signInContainer: {
    flex: 1,
    height: '100%',
    padding: 16,
    backgroundColor: '#fff',
  },
  backArrowWrapper: {
    backgroundColor: '#F7F9FC',
    height: 30,
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  welcomeWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTextOne: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: '#373E4E',
    marginBottom: 20,
  },
  welcomeTextTwo: {
    textAlign: 'center',
    fontSize: 14,
  },
  controlsWrapper: {
    display: 'flex',
    marginTop: '30%',
    marginBottom: 'auto',
  },
  emailInput: {
    borderBottomColor: '#3E79E3',
    borderBottomWidth: 2,
    borderRadius: 1,
  },
  pwdInputWrapper: {
    borderBottomColor: '#3E79E3',
    borderBottomWidth: 2,
    borderRadius: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pwdInput: {height: '100%'},
  pwdWrapperOne: {
    marginTop: 30,
  },
  btnContinue: {
    marginTop: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 13,
  },
  continueText: {
    color: '#fff',
  },
  passwordText: {
    color: '#3E79E3',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },
});

export default styles;
