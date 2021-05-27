import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {Colors} from '../../Assets';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('screen');

const Header = (props) => {
  const {expanded, IconName, OnExpand, icon, date, RightText, OnSort} = props;

  let [Buttons, setButtons] = useState([
    {
      active: true,
    },
    {
      active: false,
    },
    {
      active: false,
    },
  ]);

  const sortBy = (index) => {
    OnSort(index);
    var found = Buttons.findIndex(({active}) => {
      return active == true;
    });
    let btn = [...Buttons];
    btn[found].active = false;
    btn[index].active = true;
    setButtons(() => btn);
  };
  return (
    <View
      style={[
        styles.ContainerHeader,
        icon && {
          alignItems: 'center',
        },
      ]}>
      <Text style={styles.txtUserName}>{date}</Text>
      {IconName ? (
        <TouchableOpacity
          style={{marginEnd: 25, alignSelf: 'center'}}
          onPress={OnExpand}>
          <View style={{flexDirection: 'row'}}>
            <Icon name={IconName} size={30} color={Colors.SecondMainColor} />
            <View style={styles.container}>
              {expanded && (
                <View style={styles.tile}>
                  {Buttons.map((obj, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.FilterBtn}
                      onPress={() => sortBy(index, false)}>
                      <Text style={styles.FilterName}>
                        {index == 0
                          ? "All Task's"
                          : index == 1
                          ? 'Completed'
                          : 'active Task'}
                      </Text>
                      <Icon
                        name={
                          obj.active ? 'record-circle' : 'record-circle-outline'
                        }
                        size={25}
                        color={Colors.MainColor}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <Text style={styles.txtUserName}>{RightText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  txtUserName: {
    fontSize: 19,
    fontWeight: 'bold',
    lineHeight: 30,
    marginStart: 25,
    color: Colors.White,
    letterSpacing: 0.5,
    marginEnd: 25,
  },
  ContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tile: {
    marginStart: 15,
    backgroundColor: Colors.White,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 10,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    margin: 5,
  },
  FilterName: {color: '#000', fontSize: 17, marginEnd: 10, letterSpacing: 0.7},
  FilterBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
  },
});

export default Header;
