import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  signUpContainer: {
    flex: 1,
    height: '100%',
    padding: 16,
    backgroundColor: '#fff',
  },
  signUpHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backArrowWrapper: {
    backgroundColor: '#F7F9FC',
    height: 30,
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  progress: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  signUpContent: {
    display: 'flex',
    position: 'relative',
    height: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  welcomeWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeTextOne: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: '#373E4E',
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
    marginBottom: 20
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
});

export default styles;
