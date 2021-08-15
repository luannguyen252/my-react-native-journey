import React, {useState} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import styles from './favoritesStyle';
import {Delete} from '../../assets/icons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Wall, Room, Bed} from '../../assets/icons';
import PropertyImage from '../../assets/images/property-image-1.png';

export function Favorites({navigation}) {
  const [data, setData] = useState({
    favorites: ['One', 'Two', 'Three', 'Four', 'One', 'Two', 'Three', 'Four'],
  });

  return (
    <View style={styles.favouritesContainer}>
      <View style={styles.favouritesHeader}>
        <Text style={styles.headerText}>My Favorites</Text>
        <Delete />
      </View>
      <ScrollView
        style={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        {data?.favorites.map((property, index) => (
          <View
            key={index}
            style={[
              styles.propertyContainer,
              index == 0
                ? [styles.marginTop15, styles.marginBottom15]
                : styles.marginBottom15,
            ]}>
            <View style={styles.propertyImgWrapper}>
              <Image source={PropertyImage} style={styles.imageBg} />
            </View>
            <View style={styles.propertyDetails}>
              <Text style={styles.priceText}>₦340,000</Text>
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
              <View style={styles.propertyInfo}>
                <View style={styles.singlePropertyInfo}>
                  <Bed width={12} height={12} />
                  <Text style={styles.singlePropertyText}>2</Text>
                </View>
                <View style={styles.singlePropertyInfo}>
                  <Room width={12} height={12} />
                  <Text style={styles.singlePropertyText}>1</Text>
                </View>
                <View style={styles.singlePropertyInfo}>
                  <Wall width={12} height={12} />
                  <Text style={styles.singlePropertyText}>1,100 Sqft</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
