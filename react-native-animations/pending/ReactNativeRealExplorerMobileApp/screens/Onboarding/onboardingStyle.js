import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  onboardingContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  onboardingContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  onboardingImgWrapper: {
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
  },
  bottomWrapper: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  progress: {
    marginLeft: 'auto',
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 45,
    width: 45,
    marginLeft: 'auto',
  },
});
export default styles;
