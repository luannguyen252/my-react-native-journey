import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  favouritesContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
  },
  favouritesHeader: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollViewContent: {height: '100%', paddingHorizontal: 16},
  propertyContainer: {
    borderWidth: 1,
    borderColor: '#F1F1F1',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  marginTop15: {marginTop: 15},
  marginBottom15: {marginBottom: 15},
  propertyImgWrapper: {
    position: 'relative',
    width: '40%',
    height: 120,
  },
  imageBg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  priceText: {
    backgroundColor: '#00AB6B',
    alignSelf: 'flex-start',
    color: '#fff',
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  propertyDetails: {
    paddingHorizontal: 10,
    display: 'flex',
    justifyContent: 'center',
    width: '60%',
  },
  propertyName: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 7,
  },
  propertyAddress: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  propertyLocation: {fontSize: 13, opacity: 0.5, marginBottom: 3},
  propertyInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  singlePropertyInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  singlePropertyText: {
    opacity: 0.5,
    marginLeft: 5,
    fontSize: 13,
  },
});

export default styles;
