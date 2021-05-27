import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import {Colors} from '../../Assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const {width} = Dimensions.get('screen');

const Task = (props) => {
  const {Data, Period, OnEdit, OnDeleteTask, OnCompleteTask} = props;

  let opacity = new Animated.Value(0);

  const animate = (easing) => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1700,
      useNativeDriver: false,
      easing,
    }).start();
  };

  const sizeWidth = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width - 45],
  });

  const animatedStyles = [
    styles.MainContainer,
    {
      opacity,
      width: sizeWidth,
    },
  ];

  useEffect(() => {
    animate(Easing.out(Easing.exp));
  }, []);

  return (
    <Animated.View style={animatedStyles}>
      <View style={{flex: 1, marginEnd: 10, padding: 10}}>
        <View style={styles.TitleContainer}>
          <Text style={styles.titleTxt}>{Data['title']}</Text>
          {!Period && (
            <TouchableOpacity onPress={() => OnEdit(Data)}>
              <Icon name={'pencil'} size={20} color={Colors.fontDark} />
            </TouchableOpacity>
          )}
        </View>
        <View style={{marginTop: 13, marginBottom: 20}}>
          <Text style={styles.ContentTxt}>{Data['content']}</Text>
        </View>
        <View style={styles.CompleteDeleteContainer}>
          <TouchableOpacity onPress={() => OnDeleteTask(Data)}>
            <Icon name={'delete'} size={20} color={'#540D47'} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => OnCompleteTask(Data)}>
            <Icon
              name={
                Data['completed']
                  ? 'checkbox-marked-circle'
                  : 'checkbox-marked-circle-outline'
              }
              size={20}
              color={
                Data['completed']
                  ? Colors.MainColor
                  : Colors.SecondRelativeMainColor
              }
            />
          </TouchableOpacity>
        </View>
      </View>
      {Data['completed'] && (
        <View style={styles.ContainerDone}>
          <Text
            style={{
              transform: [{rotate: '-90deg'}],
              alignSelf: 'center',
              color: '#233155',
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            Done
          </Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: Colors.White,
    width: '90%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    flex: 1,
  },
  TitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  titleTxt: {
    color: Colors.SecondRelativeMainColor,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  CompleteDeleteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  DoneTxt: {
    textAlign: 'center',
    color: Colors.MainColor,
    fontSize: 12,
  },
  ContentTxt: {
    color: Colors.SecondRelativeMainColor,
    letterSpacing: 0.7,
    fontSize: 14,
  },
  ContainerDone: {
    backgroundColor: Colors.SecondMainColor,
    flexDirection: 'row',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default Task;
