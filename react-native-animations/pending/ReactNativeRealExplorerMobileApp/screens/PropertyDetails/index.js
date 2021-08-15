import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from './propertyDetailsStyle';
import PropertyImage from '../../assets/images/property-image-1.png';

export function PropertyDetails() {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.propertyDetailsHeader}>
        <TouchableOpacity>
          <FontAwesome name="long-arrow-left" size={20} />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerLeftContent}>
            <AntDesign name="sharealt" size={20} />
            <MaterialIcons name="favorite-border" color="#ccc" size={25} />
          </View>
          <Text
            style={styles.propertyName}
            numberOfLines={1}
            ellipsizeMode="tail">
            Darga Mawijaya Tower Surabaya
          </Text>
          <View style={styles.propertyAddress}>
            <EvilIcons name="location" size={18} color="gray" />
            <Text
              style={styles.propertyLocation}
              numberOfLines={1}
              ellipsizeMode="tail">
              Ogunabali, Port Harcourt
            </Text>
          </View>
          <Image source={PropertyImage} style={styles.imageBg} />
          <View>
            
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
