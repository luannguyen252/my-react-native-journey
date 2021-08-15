import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  messagesContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
  },
  messagesHeader: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 30,
  },
  headerText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchIcon: {
    marginRight: 20,
  },
  scrollViewContent: {height: '100%', paddingHorizontal: 16},
  noneFoundContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  singlePropertyManager: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  propertyManagerPic: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  propertyManagerInfo: {
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
    paddingVertical: 15   
  },
  propertyManagerColumnWrapper:{
    width: '70%',
    marginRight: 10,
  },
  propertyManagerName: {
    fontWeight: 'bold',
  },
  propertyManagerLastMessage: {
    opacity: 0.5,
    fontSize: 13
  },
  propertyManagerLastMessageTime:{
    fontSize: 10,
    textAlign: 'right',
  }
});

export default styles;
