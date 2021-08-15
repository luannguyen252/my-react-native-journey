import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FD',
    paddingVertical: 30,
  },
  headerText1: {fontSize: 16, fontWeight: '500'},
  headerText2: {fontSize: 20, fontWeight: '500', marginBottom: 40},
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
  },
  searchIcon: {
    position: 'absolute',
    top: 11,
    left: 5,
  },
  searchInput: {
    fontSize: 15,
    width: '100%',
    height: '100%',
    paddingLeft: 32,
  },
  paddingRight5: {
    paddingRight: 5,
  },
  paddingRight30: {
    paddingRight: 30,
  },
  clearTextIcon: {position: 'absolute', top: 10, right: 5},
  scrollViewContent: {
    flex: 1,
    height: '100%',
    padding: 16,
  },
  textHead1: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 15,
  },
  flexRowJustify: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 35,
  },
  singleColumn: {
    width: '20%',
    display: 'flex',
    alignItems: 'center',
  },
  singleCard: {
    backgroundColor: '#F3F3F3',
    borderRadius: 20,
    height: 65,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  cardText: {fontSize: 11, fontWeight: '500', textAlign: 'center'},
  handpickedContainer: {
    marginBottom: 30,
  },
  handpickedContent: {
    display: 'flex',
    flexDirection: 'row',
  },
  singleHandpickedWrapper: {
    width: 250,
    paddingBottom: 16,
    borderColor: '#F1F1F1',
    borderWidth: 1,
    borderRadius: 5,
  },
  marginRight15: {
    marginRight: 15,
  },
  marginRight5: {
    marginRight: 5,
  },
  propertyImage: {
    width: '100%',
    height: 130,
    resizeMode: 'cover',
    marginBottom: 15,
  },
  propertyDetails: {
    paddingHorizontal: 10,
  },
  propertyPrice: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    color: '#2058DB',
    borderColor: '#2058DB',
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginBottom: 5,
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
  propertyLocation: {fontSize: 13},
  textHead2: {
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 5,
    opacity: 0.7
  },
  savingText: {opacity: 0.5, fontSize: 13, marginBottom: 10},
  savingContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  learnMoreText: {
    backgroundColor: '#2058DB',
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 3,
  },
});

export default styles;
