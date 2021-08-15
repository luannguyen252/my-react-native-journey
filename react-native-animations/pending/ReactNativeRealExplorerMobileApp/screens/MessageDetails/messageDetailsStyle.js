import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  messageDetailsContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
  },
  messageDetailsHeader: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    // marginBottom: 30,
  },
  headerText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: 'bold',
    fontSize: 16,
    width: '50%',
  },
  phoneIcon: {
    marginLeft: 10,
    marginRight: 20,
  },
  messageDetailsContent: {
    flex: 1,
    position: 'relative',
  },
  scrollViewContent: {
    height: '100%',
  },
  bottomMessageContainer: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingHorizontal: 16,
    paddingTop: 5,
    paddingBottom: 10,
    width: '100%',
    backgroundColor: '#fff'
  },
  messageFieldWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    height: 40,
    paddingLeft: 10,
    width: '85%',
    marginRight: 'auto',
  },
  messageTextInput: {
    flex: 1,
    marginLeft: 10,
  },
  sendMessageBtn: {
    backgroundColor: '#00AB6B',
    borderRadius: 5,
    height: '100%',
    width: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {
    padding: 16,
    marginBottom: 50
  },
  viewListingBtn: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    alignSelf: 'flex-end',
    borderRadius: 5,
    marginBottom: 15,
  },
  propertyContainer: {
    borderRadius: 7,
    backgroundColor: '#F9F9F9',
    width: 280,
    alignSelf: 'flex-end',
    paddingBottom: 15,
    marginBottom: 20,
  },
  propertyImage: {
    height: 170,
    width: 280,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  propertyTitle: {
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 2,
  },
  propertyLocation: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 5,
    alignItems: 'center',
  },
  propertyLocationText: {
    color: 'gray',
    fontSize: 12,
  },
  senderMessageContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  senderMessageText: {
    maxWidth: '75%',
    color: '#fff',
    backgroundColor: '#2058DB',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    padding: 10,
    marginBottom: 5,
  },
  senderMessageTimeText: {
    opacity: 0.5,
    marginLeft: 'auto',
    fontSize: 12,
  },
  receiverMessageWrapper: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  receiverProfilePic: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  receiverMessageContainer: {
    marginBottom: 20,
  },
  receiverMessageText: {
    maxWidth: '75%',
    color: '#000',
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    padding: 10,
    marginBottom: 5,
  },
  receiverMessageTimeText: {
    fontSize: 12,
  },
});

export default styles;
