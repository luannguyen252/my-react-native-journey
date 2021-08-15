import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  searchResultLayout: {
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
  searchContainer: {
    height: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    position: 'relative',
    marginBottom: 40,
  },
  backArrow: {marginLeft: 7},
  searchInput: {
    fontSize: 15,
    width: '100%',
    height: '100%',
    paddingLeft: 15,
  },
  clearTextIcon: {position: 'absolute', top: 10, right: 5},
  flexRowJustifyBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  showResultText: {
    fontWeight: '700',
    fontSize: 16,
  },
  noOfPropertiesText: {
    fontSize: 12,
    opacity: 0.9,
  },
  filterWrapper: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  resultContent: {paddingBottom: 240},
  scrollViewContent: {height: '100%'},
  propertyContainer: {
    marginBottom: 30,
  },
  propertyContent: {
    borderWidth: 1,
    borderColor: '#F1F1F1',
    borderRadius: 5,
    paddingBottom: 7,
    marginBottom: 15,
  },
  propertyImgWrapper: {
    position: 'relative',
    height: 200,
    marginBottom: 10,
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
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  propertyDetails: {
    width: '100%',
    paddingHorizontal: 10,
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
  },
});

export default styles;
