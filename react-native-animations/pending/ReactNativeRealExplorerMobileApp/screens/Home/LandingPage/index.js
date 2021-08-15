import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from './landingPageStyle';
import {
  FindAgent,
  ExploreMap,
  BlogAndNews,
  HomeLoans,
  Property,
} from '../../../assets/showcase';
import PropertyImage from '../../../assets/images/property-image.png';
import {combineData} from '../../../utils/helpers';

export default function LandingPage({toggleActivePage}) {
  const [data, setData] = useState({
    searchText: '',
    isSearchFocused: false,
  });

  const inputRef = useRef(null);

  const handleSetData = (key, value) => {
    setData(combineData(data, {key, value}));
  };

  const handleSearch = () => {
    const obj = {activePage: 'SearchResult', searchText: data.searchText};
    toggleActivePage(obj);
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText1}>Find Thousand of Homes</Text>
        <Text style={styles.headerText2}>For Rent &amp; Buy</Text>
        <View style={styles.searchContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              inputRef.current.focus();
            }}>
            <EvilIcons
              name="search"
              size={22}
              color="#AEAEBF"
              style={styles.searchIcon}
            />
          </TouchableWithoutFeedback>
          <TextInput
            ref={inputRef}
            placeholder="Search for property"
            style={[
              styles.searchInput,
              !data.searchText ? styles.paddingRight5 : styles.paddingRight30,
            ]}
            value={data.searchText}
            onChangeText={(inputValue) =>
              setData({...data, searchText: inputValue})
            }
            onFocus={() => handleSetData('isSearchFocused', true)}
            onBlur={() => handleSetData('isSearchFocused', false)}
            onSubmitEditing={() => handleSearch()}
          />
          {data.searchText ? (
            <TouchableWithoutFeedback
              onPress={() => handleSetData('searchText', '')}>
              <EvilIcons
                name="close"
                size={25}
                color="#AEAEBF"
                style={styles.clearTextIcon}
              />
            </TouchableWithoutFeedback>
          ) : null}
        </View>
      </View>
      <ScrollView
        style={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.textHead1}>Might help you</Text>
        <View style={styles.flexRowJustify}>
          <View style={styles.singleColumn}>
            <View style={styles.singleCard}>
              <FindAgent />
            </View>
            <Text style={styles.cardText}>Find Agent</Text>
          </View>
          <View style={styles.singleColumn}>
            <View style={styles.singleCard}>
              <ExploreMap />
            </View>
            <Text style={styles.cardText}>Explore Map</Text>
          </View>
          <View style={styles.singleColumn}>
            <View style={styles.singleCard}>
              <BlogAndNews />
            </View>
            <Text style={styles.cardText}>Blog &amp; News</Text>
          </View>
          <View style={styles.singleColumn}>
            <View style={styles.singleCard}>
              <HomeLoans />
            </View>
            <Text style={styles.cardText}>Home Loans</Text>
          </View>
        </View>
        <Text style={styles.textHead1}>Handpicked Project</Text>
        <ScrollView
          style={styles.handpickedContainer}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <View style={styles.handpickedContent}>
            <View
              style={[styles.singleHandpickedWrapper, styles.marginRight15]}>
              <Image source={PropertyImage} style={styles.propertyImage} />
              <View style={styles.propertyDetails}>
                <Text style={styles.propertyPrice}>{`₦100k - 1M`}</Text>
                <Text
                  style={styles.propertyName}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  The Slebew Residence
                </Text>
                <View style={styles.propertyAddress}>
                  <EvilIcons name="location" size={16} />
                  <Text
                    style={styles.propertyLocation}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    Ogunabali , Port Harcourt
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={[styles.singleHandpickedWrapper, styles.marginRight15]}>
              <Image source={PropertyImage} style={styles.propertyImage} />
              <View style={styles.propertyDetails}>
                <Text style={styles.propertyPrice}>{`₦100k - 1M`}</Text>
                <Text
                  style={styles.propertyName}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  The Slebew Residence
                </Text>
                <View style={styles.propertyAddress}>
                  <EvilIcons name="location" size={16} />
                  <Text
                    style={styles.propertyLocation}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    Ogunabali , Port Harcourt
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={[styles.singleHandpickedWrapper, styles.marginRight15]}>
              <Image source={PropertyImage} style={styles.propertyImage} />
              <View style={styles.propertyDetails}>
                <Text style={styles.propertyPrice}>{`₦100k - 1M`}</Text>
                <Text
                  style={styles.propertyName}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  The Slebew Residence
                </Text>
                <View style={styles.propertyAddress}>
                  <EvilIcons name="location" size={16} />
                  <Text
                    style={styles.propertyLocation}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    Ogunabali , Port Harcourt
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.singleHandpickedWrapper, styles.marginRight5]}>
              <Image source={PropertyImage} style={styles.propertyImage} />
              <View style={styles.propertyDetails}>
                <Text style={styles.propertyPrice}>{`₦100k - 1M`}</Text>
                <Text
                  style={styles.propertyName}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  The Slebew Residence
                </Text>
                <View style={styles.propertyAddress}>
                  <EvilIcons name="location" size={16} />
                  <Text
                    style={styles.propertyLocation}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    Ogunabali , Port Harcourt
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <Text style={styles.textHead2}>Do you want to save for property?</Text>
        <Text style={styles.savingText}>
          Saving for property can be {'\n'} of help to you.
        </Text>
        <View style={styles.savingContainer}>
          <Text style={styles.learnMoreText}>Learn More</Text>
          <Property />
        </View>
      </ScrollView>
    </>
  );
}
