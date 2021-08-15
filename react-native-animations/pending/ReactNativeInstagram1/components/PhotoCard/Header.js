import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Touchable from '@appandflow/touchable';
import Entypo from 'react-native-vector-icons/Entypo';
import { human } from 'react-native-typography';

const uri = 'https://nerdist.com/wp-content/uploads/2017/09/robert-baratheon-970x545.jpg';
const username = 'Bobby B';
const loc = 'Kingslanding, Westeros';

const Header = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.leftSide}>
        <View style={styles.avatar}>
          <Image source={{ uri }} style={styles.avatarImg} />
        </View>
        <View style={styles.user}>
          <Text style={human.subheadObject}> {username} </Text>
          <Text style={human.footnoteObject}> {loc} </Text>
        </View>
      </View>

      <View style={styles.rightSide}>
        <Touchable feedback="opacity">
          <Entypo name="dots-three-vertical" size={17} color="gray" />
        </Touchable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  leftSide: {
    flex: 0.9,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  rightSide: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarImg: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  user: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 10
  }
});

export default Header;
