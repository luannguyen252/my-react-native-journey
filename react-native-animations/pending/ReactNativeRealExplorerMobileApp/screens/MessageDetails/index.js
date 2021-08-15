import React, {useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import shortid from 'shortid';
import styles from './messageDetailsStyle';
import {handleScreenBack} from '../../navigators/NavigatorHandler';
import {combineData} from '../../utils/helpers';
import {CustomArrowUp} from '../../assets/icons';

export function MessageDetails({navigation}) {
  const [data, setData] = useState({});

  return (
    <KeyboardAvoidingView style={styles.messageDetailsContainer}>
      <View style={styles.messageDetailsHeader}>
        <TouchableOpacity onPress={() => handleScreenBack(navigation)}>
          <View style={styles.backArrowWrapper}>
            <AntDesign name="arrowleft" size={20} color="#000" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerText} numberOfLines={1} ellipsizeMode="tail">
          Veronica Jung
        </Text>
        <Feather
          name="phone"
          size={20}
          color="#00AB6B"
          style={styles.phoneIcon}
        />
        <MaterialIcons name="perm-device-info" size={20} color="#00AB6B" />
      </View>
      <View style={styles.messageDetailsContent}>
        <ScrollView
          style={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.messageContainer}>
            <Text style={styles.viewListingBtn}>View Listing</Text>
            <View style={styles.propertyContainer}>
              <Image
                source={{
                  uri:
                    'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
                }}
                style={styles.propertyImage}
              />
              <Text style={styles.propertyTitle}>
                Darga Mawijaya Tower Surabaya
              </Text>
              <View style={styles.propertyLocation}>
                <EvilIcons name="location" size={18} color="gray" />
                <Text style={styles.propertyLocationText}>
                  Dukuh Pakis, Dukuh Pakis, Surabaya
                </Text>
              </View>
            </View>
            <View style={styles.senderMessageContainer}>
              <Text style={styles.senderMessageText}>
                Hello we are interested in this how about the price?
              </Text>
              <Text style={styles.senderMessageTimeText}>8:46 AM</Text>
            </View>
            <View style={styles.receiverMessageWrapper}>
              <Image
                source={{
                  uri: 'https://randomuser.me/api/portraits/women/0.jpg',
                }}
                style={styles.receiverProfilePic}
              />
              <View style={styles.receiverMessageContainer}>
                <Text style={styles.receiverMessageText}>
                  Hi,There, the price is negotiable
                </Text>
                <Text style={styles.receiverMessageTimeText}>8:46 AM</Text>
              </View>
            </View>
            <View style={styles.propertyContainer}>
              <Image
                source={{
                  uri:
                    'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
                }}
                style={styles.propertyImage}
              />
              <Text style={styles.propertyTitle}>
                Darga Mawijaya Tower Surabaya
              </Text>
              <View style={styles.propertyLocation}>
                <EvilIcons name="location" size={18} color="gray" />
                <Text style={styles.propertyLocationText}>
                  Dukuh Pakis, Dukuh Pakis, Surabaya
                </Text>
              </View>
            </View>
            <View style={styles.senderMessageContainer}>
              <Text style={styles.senderMessageText}>
                Hello we are interested in this how about the price?
              </Text>
              <Text style={styles.senderMessageTimeText}>8:46 AM</Text>
            </View>
            <View style={styles.receiverMessageWrapper}>
              <Image
                source={{
                  uri: 'https://randomuser.me/api/portraits/women/0.jpg',
                }}
                style={styles.receiverProfilePic}
              />
              <View style={styles.receiverMessageContainer}>
                <Text style={styles.receiverMessageText}>
                  Hi,There, the price is negotiable
                </Text>
                <Text style={styles.receiverMessageTimeText}>8:46 AM</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottomMessageContainer}>
          <View style={styles.messageFieldWrapper}>
            <AntDesign name="camerao" size={20} color="gray" />
            <TextInput
              placeholder="Type Message"
              style={styles.messageTextInput}
            />
          </View>
          <TouchableOpacity>
            <View style={styles.sendMessageBtn}>
              <CustomArrowUp width={25} height={25} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
