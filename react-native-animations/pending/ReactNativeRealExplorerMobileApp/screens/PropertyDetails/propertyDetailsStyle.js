import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  propertyDetailsHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeftContent: {
    display: 'flex',
    flexDirection: 'row',
  },
  propertyName: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 3,
  },
  propertyAddress: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  propertyLocation: {fontSize: 15, opacity: 0.5, marginLeft: 5},
  imageBg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default styles;
