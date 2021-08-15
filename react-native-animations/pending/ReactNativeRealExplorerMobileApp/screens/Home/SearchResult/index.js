import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './searchResultStyle';
import {Filter, Wall, Room, Bed} from '../../../assets/icons';
import PropertyImage from '../../../assets/images/property-image-1.png';
import {combineData} from '../../../utils/helpers';

export default function SearchResult({toggleActivePage, searchText}) {
  const [data, setData] = useState({
    searchValue: searchText,
    properties: ['One', 'Two', 'Three', 'Four'],
  });

  const handleGoBack = () => {
    const obj = {activePage: 'LandingPage'};
    toggleActivePage(obj);
  };

  const handleSetData = (key, value) => {
    setData(combineData(data, {key, value}));
  };

  return (
    <View style={styles.searchResultLayout}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => handleGoBack()}>
          <AntDesign
            name="arrowleft"
            size={20}
            color="#000"
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <TextInput
          value={data.searchValue}
          style={[
            styles.searchInput,
            data.searchValue ? styles.paddingRight5 : styles.paddingRight30,
          ]}
          placeholder="Search"
          onChangeText={(inputValue) =>
            handleSetData('searchValue', inputValue)
          }
        />
        {data.searchValue ? (
          <TouchableWithoutFeedback
            onPress={() => handleSetData('searchValue', '')}>
            <EvilIcons
              name="close"
              size={25}
              color="#000"
              style={styles.clearTextIcon}
            />
          </TouchableWithoutFeedback>
        ) : null}
      </View>
      <View style={styles.flexRowJustifyBetween}>
        <View>
          <Text style={styles.showResultText}>Showing Result</Text>
          <Text style={styles.noOfPropertiesText}>94 Properties found</Text>
        </View>
        <View style={styles.filterWrapper}>
          <Filter />
          <Text>Filters</Text>
        </View>
      </View>
      <View style={styles.resultContent}>
        <ScrollView
          style={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}>
          {data.properties.map((property, index) => (
            <View key={index} style={styles.propertyContainer}>
              <View style={styles.propertyContent}>
                <View style={styles.propertyImgWrapper}>
                  <Image source={PropertyImage} style={styles.imageBg} />
                  <Text style={styles.priceText}>₦340,000</Text>
                </View>
                <View style={styles.propertyDetails}>
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
                </View>
              </View>
              <View style={styles.propertyInfo}>
                <View style={styles.singlePropertyInfo}>
                  <Bed width={18} height={14} />
                  <Text style={styles.singlePropertyText}>2</Text>
                </View>
                <View style={styles.singlePropertyInfo}>
                  <Room width={18} height={14} />
                  <Text style={styles.singlePropertyText}>1</Text>
                </View>
                <View style={styles.singlePropertyInfo}>
                  <Wall width={18} height={14} />
                  <Text style={styles.singlePropertyText}>1,100 Sqft</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
