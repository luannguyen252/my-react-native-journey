import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import Styles from './styles';
import {LoadingModal, PopUp, EmptyState} from '../../Components';
import {Icons} from '../../Assets';
import {useSelector, useDispatch} from 'react-redux';
import * as TODOActions from '../../Store/Actions/TODO';
import moment from 'moment';
import Tasks from './RenderTasks';
import Header from '../Home/Header';
import {useIsFocused} from '@react-navigation/native';

// config animation collapse
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AllTasks = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const StatusToDoResponse = useSelector(
    (state) => state.TODO.StatusToDoResponse,
  );

  const AllTodoList = useSelector((state) => state.TODO.ToDoList);

  let [expanded, setExpanded] = useState(false);
  let [LoadingModalVisible, IsLoadingModalVisible] = useState(false);
  let [PopupModel, setVisiabiltyPopUp] = useState(false);
  let [MessagePopUp, setMessagePopUp] = useState('');
  let [FilteredArray, setFilteredArray] = useState([]);
  let [indexSortBy, setindexSortBy] = useState(0);
  let [Focused, setIsFocused] = useState(false);

  const setToDoList = (ToDoStatus) => {
    return {
      List: ToDoStatus,
      type: 'GET_TODO',
    };
  };

  /* this because when user edit content update doesn't reach to local array 
  I have to refresh array after coming from Edit task or inziallize after getting in 
  */
  useEffect(() => {
    sortBy(indexSortBy, false);
  }, [isFocused]);

  useEffect(() => {
    if (StatusToDoResponse != null) {
      if (StatusToDoResponse == 200) {
        IsLoadingModalVisible(false);
        dispatch(setToDoList({Status: null}));
        sortBy(indexSortBy, true);
      } else if (StatusToDoResponse == 408) {
        IsLoadingModalVisible(false);
        setMessagePopUp('No internet Connection');
        dispatch(setToDoList({Status: null}));
        setVisiabiltyPopUp(true);
      } else if (StatusToDoResponse == 401) {
        IsLoadingModalVisible(false);
        dispatch(setToDoList({Status: null}));
      } else if (StatusToDoResponse == 204) {
        dispatch(setToDoList({Status: null}));
        sortBy(indexSortBy, true);
      }
    }
  }, [StatusToDoResponse]);

  const PopupactionFunction = useCallback(() => {
    setVisiabiltyPopUp(() => false);
  }, [setVisiabiltyPopUp]);

  const OnEdit = (EditTask) => {
    props.navigation.push('AddTask', {
      EditTask,
    });
    setIsFocused(false);
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

  const OnDeleteTask = (Task) => {
    dispatch(TODOActions.Delete_TODO(Task));
  };

  const sortBy = (index, Animate) => {
    setindexSortBy(index);
    setIsFocused(true);

    if (index == 0) {
      if (Animate) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      }
      //show All Tasks
      setFilteredArray([...AllTodoList]);
    } else if (index == 1) {
      //filter by Completed
      let FilteredTasks = AllTodoList.filter((item) => {
        return item['completed'] == true;
      });

      if (Animate) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }
      setFilteredArray([...FilteredTasks]);
    } else {
      //filter by active task
      let FilteredTasks = AllTodoList.filter((item) => {
        return item['completed'] != true;
      });

      if (Animate) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
      }
      setFilteredArray([...FilteredTasks]);
    }
  };

  const renderTasks = (item, index) => {
    return (
      <View key={index}>
        <View style={Styles.ContainerTOFROM}>
          <Text style={Styles.To}>
            {moment(item['created']).format('ddd D MMM, YYYY')}
          </Text>
          <Text style={Styles.From}>
            {moment(item['due_date']).format('ddd D MMM, YYYY')}
          </Text>
        </View>
        <Tasks
          Data={item}
          OnEdit={OnEdit}
          OnCompleteTask={OnCompleteTask}
          OnDeleteTask={OnDeleteTask}
        />
      </View>
    );
  };

  return (
    <View style={Styles.MainContainer}>
      <Header
        date={`${moment().format('D MMMM, YYYY')} ${`\n`} ${moment().format(
          'dddd',
        )} ${'\n'}`}
        IconName={'filter-menu'}
        expanded={expanded}
        OnExpand={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          setExpanded(!expanded);
        }}
        OnSort={sortBy}
      />
      <View style={Styles.ContainerTasks}>
        <View style={Styles.ContainerAllTask}>
          <Text style={Styles.AllTasks}>COMPLETED / REMAINING TASKS</Text>
        </View>
        {!AllTodoList.length > 0 && !LoadingModalVisible && (
          <View style={{flex: 1}}>
            <EmptyState
              MessageTitle={"You Don't have Tasks, Yet"}
              IconsName={'calendar-blank-multiple'}
              titleStyle={{fontSize: 18, letterSpacing: 0.7}}
            />
          </View>
        )}
        <View style={{flex: 1}}>
          <ScrollView>
            {Focused &&
              //why condition beacause while updating local array animation doesn't work it hide items,
              //so i tell list and the animation doesn't render until local array be ready
              FilteredArray.map((item, index) => renderTasks(item, index))}
          </ScrollView>
        </View>
      </View>

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

export default AllTasks;
