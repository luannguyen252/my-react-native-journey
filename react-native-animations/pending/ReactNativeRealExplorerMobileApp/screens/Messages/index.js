import React, {useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import shortid from 'shortid';
import styles from './messagesStyle';
import {handleNestedNavigation} from '../../navigators/NavigatorHandler';
import {getScreenParent} from '../../utils/navigationHelper';

export function Messages({navigation}) {
  const [data, setData] = useState({
    propertyManagers: [
      {
        name: 'Veronica Jung',
        profilePic: 'https://randomuser.me/api/portraits/women/0.jpg',
        lastMessage: 'Hi, there, the price is negotiable',
        lastMessageTime: '1:24 PM',
      },
      {
        name: 'James Corton',
        profilePic: 'https://randomuser.me/api/portraits/men/11.jpg',
        lastMessage: 'Have a plan to discuss this?',
        lastMessageTime: '9:22 AM',
      },
      {
        name: 'Nicole Ben',
        profilePic: 'https://randomuser.me/api/portraits/women/26.jpg',
        lastMessage: 'Thank you for the information',
        lastMessageTime: '6:17 AM',
      },
    ],
  });

  const handleNavigation = (route, param) => {
    handleNestedNavigation(navigation, getScreenParent(route), route, param);
  };

  return (
    <KeyboardAvoidingView style={styles.messageContainer}>
      <View style={styles.messagesHeader}>
        <Text style={styles.headerText}>Messages</Text>
        <Feather
          name="search"
          size={20}
          color="gray"
          style={styles.searchIcon}
        />
        <Feather name="more-vertical" size={20} color="gray" />
      </View>
      <ScrollView
        style={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        {data.propertyManagers?.length ? (
          data.propertyManagers.map((propertyManager) => (
            <TouchableWithoutFeedback
              key={shortid.generate()}
              onPress={() => handleNavigation('MessageDetails')}>
              <View style={styles.singlePropertyManager}>
                <Image
                  source={{uri: propertyManager.profilePic}}
                  style={styles.propertyManagerPic}
                />
                <View style={styles.propertyManagerInfo}>
                  <View style={styles.propertyManagerColumnWrapper}>
                    <Text style={styles.propertyManagerName}>
                      {propertyManager.name}
                    </Text>
                    <Text style={styles.propertyManagerLastMessage}>
                      {propertyManager.lastMessage}
                    </Text>
                  </View>
                  <Text style={styles.propertyManagerLastMessageTime}>
                    {propertyManager.lastMessageTime}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))
        ) : (
          <View style={styles.noneFoundContainer}>
            <Text>None found</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
