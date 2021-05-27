import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import Styles from './styles';
import {Button, LoadingModal, PopUp, EmptyState} from '../../Components';
import {Icons, Colors} from '../../Assets';
import {useSelector, useDispatch} from 'react-redux';
import * as TODOActions from '../../Store/Actions/TODO';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import Header from './Header';
import Tasks from './RenderTasks';

const Home = (props) => {
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const UserInfo = useSelector((state) => state.Auth.UserInfo);

  const StatusToDoResponse = useSelector(
    (state) => state.TODO.StatusToDoResponse,
  );

  const TodayTODOlist = useSelector((state) => state.TODO.TodayTODOList);

  let [LoadingModalVisible, IsLoadingModalVisible] = useState(true);

  let [PopupModel, setVisiabiltyPopUp] = useState(false);

  let [MessagePopUp, setMessagePopUp] = useState('');

  let [refreshing, setRefreshing] = useState(false);

  const setToDoList = (ToDoStatus) => {
    return {
      List: ToDoStatus,
      type: 'GET_TODO',
    };
  };

  const setUserProfile = (userState) => {
    return {
      userData: userState,
      type: 'GET_SIGNINAUTH',
    };
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('com.dailymealz.userInfo');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    if (StatusToDoResponse != null) {
      if (StatusToDoResponse == 200) {
        setRefreshing(false);
        IsLoadingModalVisible(false);
        dispatch(setToDoList({Status: null}));
      } else if (StatusToDoResponse == 408) {
        IsLoadingModalVisible(false);
        setRefreshing(false);
        setMessagePopUp('No internet Connection');
        dispatch(setToDoList({Status: null}));
        setVisiabiltyPopUp(true);
      } else if (StatusToDoResponse == 401) {
        IsLoadingModalVisible(false);
        setRefreshing(false);
        dispatch(setToDoList({Status: null}));
        RefreshToken();
      } else if (UserInfo.Status == 200) {
        IsLoadingModalVisible(false);
        setRefreshing(false);
        dispatch(setUserProfile({...UserInfo, Status: 0}));
      } else if (UserInfo.Status == 400) {
        dispatch(setUserProfile({...UserInfo, Status: 0}));
        props.navigation.replace('AuthStack');
        setRefreshing(false);
      } else {
        IsLoadingModalVisible(false);
        setRefreshing(false);
      }
    }
  }, [StatusToDoResponse]);

  const initFetch = useCallback(() => {
    dispatch(TODOActions.get_TODOlist());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const PopupactionFunction = useCallback(() => {
    setVisiabiltyPopUp(() => false);
  }, [setVisiabiltyPopUp]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    initFetch();
  }, []);

  const RefreshToken = async () => {
    const user = await getData();
    dispatch(
      Auth.Refresh({
        refresh: user['refresh'],
      }),
    );
  };

  const OnEdiT = (EditTask) => {
    props.navigation.push('AddTask', {
      EditTask,
    });
  };

  const OnDeleteTask = (Task) => {
    dispatch(TODOActions.Delete_TODO(Task));
  };

  const OnCompleteTask = (Task) => {
    dispatch(
      TODOActions.Update_TODO(
        {
          completed: !Task['completed'],
        },
        Task,
      ),
    );
  };

  return (
    <View style={Styles.MainContainer}>
      <Header
        date={`${moment().format('D MMMM, YYYY')} ${`\n`} ${moment().format(
          'dddd',
        )} ${'\n'}`}
        RightText={`${
          new Date().getHours() < 12
            ? 'Good Morning'
            : new Date().getHours() < 18
            ? 'Good Afternoon'
            : 'Good Evening'
        } ${`\n`} ${UserInfo['userName']}!`}
      />
      <View
        style={{backgroundColor: '#E6EFF6', flex: 1, borderTopRightRadius: 50}}>
        <View style={Styles.ContainerTodayTask}>
          <Text style={Styles.TodayTasks}>Today's Tasks</Text>
          <Button
            title={'View All Tasks'}
            Customstyle={Styles.ViewTaskBtn}
            BtnTitleStyle={{
              color: Colors.MainColor,
              fontSize: 12,
              textDecorationLine: 'underline',
            }}
            onPress={() => props.navigation.navigate('AllTasks')}
          />
        </View>
        {!TodayTODOlist.length > 0 && !LoadingModalVisible && (
          <View style={{flex: 1}}>
            <EmptyState
              MessageTitle={'No Tasks, Today'}
              IconsName={'calendar-blank'}
              titleStyle={{fontSize: 18, letterSpacing: 0.7}}
            />
          </View>
        )}

        <View style={{flex: 1}}>
          {!LoadingModalVisible && isFocused && (
            //why condition beacause while updating array animation doesn't work it hide items,
            //so i tell list and the animation doesn't render until array be ready
            <FlatList
              data={TodayTODOlist}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[
                    Colors.MainColor,
                    Colors.MarkerLabelColor,
                    Colors.DarkGrey,
                  ]}
                />
              }
              keyExtractor={(item) => item['id'].toString()}
              renderItem={({item, index}) => (
                <View style={{flex: 1}}>
                  <Tasks
                    Data={item}
                    OnEdit={OnEdiT}
                    OnCompleteTask={OnCompleteTask}
                    OnDeleteTask={OnDeleteTask}
                    key={index}
                  />
                </View>
              )}
              initialNumToRender={7}
            />
          )}
        </View>
      </View>
      <Button
        Customstyle={Styles.FloatingBtn}
        IconLeftName={'plus'}
        IconColor={Colors.SecondRelativeMainColor}
        IconSize={30}
        onPress={() => props.navigation.push('AddTask')}
      />
      <PopUp
        visible={PopupModel}
        message={MessagePopUp}
        LeftBtnName={'OK'}
        topIcon={Icons.WrongPopUp}
        LeftBtnFunction={PopupactionFunction}
      />
      <LoadingModal LoadingModalVisiblty={LoadingModalVisible} />
    </View>
  );
};

export default Home;
