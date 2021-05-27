import React, {useState, useEffect, useCallback, useReducer} from 'react';
import {View, ScrollView, Text} from 'react-native';
import Styles from './styles';
import {PopUp, Button} from '../../Components';
import {Icons, Colors} from '../../Assets';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const UserProfile = (props) => {
  const UserInfo = useSelector((state) => state.Auth.UserInfo);

  const AllTodoList = useSelector((state) => state.TODO.ToDoList);

  const TodayTODOlist = useSelector((state) => state.TODO.TodayTODOList);

  let [PopupModel, setVisiabiltyPopUp] = useState(false);

  let [MessagePopUp, setMessagePopUp] = useState('');

  let [CompletedTasks, setCompletedTasks] = useState();

  useEffect(() => {
    let filtered = AllTodoList.filter(function (item) {
      return item['completed'] === true;
    });

    setCompletedTasks(filtered.length);
  }, [AllTodoList]);

  const Logout = async () => {
    try {
      await AsyncStorage.removeItem('com.dailymealz.userInfo');
      props.navigation.replace('AuthStack');
    } catch (e) {}
  };

  const LeftBtnPopUpFunction = async () => {
    if (MessagePopUp === 'Are you sure you want to logout ?') {
      Logout();
      setVisiabiltyPopUp(() => false);
    }
  };

  const RightBtnPopUpFunction = useCallback(() => {
    setVisiabiltyPopUp(() => false);
  }, [setVisiabiltyPopUp]);

  return (
    <View style={Styles.MainContainer}>
      <ScrollView>
        <View style={{alignSelf: 'center'}}>
          <Text style={Styles.UserName}>{UserInfo['userName']}</Text>
        </View>

        <View style={Styles.InfoBoard}>
          <View>
            <Text style={Styles.InfoValue}>{TodayTODOlist.length}</Text>
            <Text style={Styles.InfoHeader}>Today's Tasks</Text>
          </View>
          <View>
            <Text style={Styles.InfoValue}>{AllTodoList.length}</Text>
            <Text style={Styles.InfoHeader}>All Task's</Text>
          </View>
          <View>
            <Text style={Styles.InfoValue}>{CompletedTasks}</Text>
            <Text style={Styles.InfoHeader}>Tasks Completed</Text>
          </View>
        </View>
        <Text style={Styles.Options}>Options</Text>

        <Button
          title={'Logout'}
          IconLeftName={'logout'}
          IconColor={Colors.SecondRelativeMainColor}
          IconSize={24}
          activeOpacity={0.8}
          BtnTitleStyle={Styles.TitleBtn}
          Customstyle={Styles.ContainerBtn}
          onPress={() => {
            setMessagePopUp('Are you sure you want to logout ?');
            setVisiabiltyPopUp(true);
          }}
        />

        <PopUp
          visible={PopupModel}
          message={MessagePopUp}
          LeftBtnName={'OK'}
          RightBtnName={
            MessagePopUp === 'Are you sure you want to logout ?' ? 'CANCEL' : ''
          }
          topIcon={Icons.WrongPopUp}
          LeftBtnFunction={LeftBtnPopUpFunction}
          RightBtnFunction={RightBtnPopUpFunction}
        />
      </ScrollView>
    </View>
  );
};

export default UserProfile;
