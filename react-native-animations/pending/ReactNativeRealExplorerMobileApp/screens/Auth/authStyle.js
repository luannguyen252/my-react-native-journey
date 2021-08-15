import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  authContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  authImgWrapper: {
    marginBottom: 40,
  },
  textOne: {
    fontWeight: 'bold',
    marginBottom: 15,
    fontSize: 18,
  },
  textTwo: {
    color: '#A4A9B2',
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: '15%'
  },
  bottomWrapper: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '7%',
    justifyContent: 'space-between',
  },
  whiteText: {
    color: '#fff',
  },
  btnGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  btnSignIn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F9FC',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  blueText: {
    color: '#3E79E3',
  },
});
export default styles;
