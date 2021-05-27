import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import Styles from './styles';
import {Button, PopUp, EmptyState} from '../../Components';
import {Icons, Colors, ColorsRandom} from '../../Assets';
import {useSelector, useDispatch} from 'react-redux';
import {CalendarList} from 'react-native-calendars';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Tasks from '../AllTasks/RenderTasks';
import * as TODOActions from '../../Store/Actions/TODO';

const PeriodTasks = () => {
  const dispatch = useDispatch();

  const AllTodoList = useSelector((state) => state.TODO.ToDoList);

  let [PopupModel, setVisiabiltyPopUp] = useState(false);

  let [MessagePopUp, setMessagePopUp] = useState('');

  let [StartDate, setStartDate] = useState('');

  let [EndDate, setEndDate] = useState('');

  let [markedDate, setmarkedDate] = useState([]);

  let [FilteredList, setFilteredList] = useState([]);

  let [ShowModal, setShowModel] = useState(false);

  const randomProperty = (obj) => {
    let keys = Object.keys(obj);

    return obj[keys[Math.floor(Math.random() * keys.length) + 1]];
  };

  const getDates = (startDate, stopDate) => {
    let dateArray = [];
    let currentDate = moment(startDate);
    while (currentDate <= moment(stopDate)) {
      let filtered = AllTodoList.filter(function (item, index, arr) {
        return item['created'] === moment(currentDate).format('YYYY-MM-DD');
      });
      dateArray = [...dateArray, ...filtered];

      currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  };

  useEffect(() => {
    let tempssss = {};
    let cart = [];
    setFilteredList([...getDates(StartDate, EndDate)]);

    for (let i = 0; i < AllTodoList.length; i++) {
      if (!cart.includes(AllTodoList[i]['created'])) {
        let filtered = AllTodoList.filter(function (item, index, arr) {
          return item['created'] === AllTodoList[i]['created'];
        });
        let temp = [];
        for (let i = 0; i < filtered.length; i++) {
          let dot = {};
          dot.key = filtered[i]['id'];
          dot.color = randomProperty(ColorsRandom);
          dot.selectedDotColor = 'red';
          temp.push(dot);
        }
        tempssss[AllTodoList[i]['created']] = {
          dots: [...temp],
        };
        cart.push(tempssss);
      }
    }
    setmarkedDate([...cart]);
  }, [AllTodoList]);

  const OnChangeDay = (day) => {
    if (StartDate == '') {
      setStartDate(day.dateString);
    } else {
      const date1 = new Date(StartDate);
      const date2 = new Date(day.dateString);

      if (date2 - date1 < 0) {
        setStartDate(day.dateString);
      } else {
        setEndDate(day.dateString);
      }
    }
  };

  const OnLongPress = (day) => {
    const date1 = new Date(EndDate);
    const date2 = new Date(day.dateString);
    if (date2 - date1 < 0) {
      setStartDate(day.dateString);
    } else {
      let tomorrow = new Date(day.dateString);
      setStartDate(day.dateString);
      setEndDate(tomorrow.toISOString().slice(0, 10));
    }
  };

  const PopupactionFunction = () => {
    setVisiabiltyPopUp(() => false);
  };

  const OnContinue = () => {
    if (StartDate !== '' && EndDate !== '') {
      setFilteredList([...getDates(StartDate, EndDate)]);
      setShowModel(true);
    } else {
      setMessagePopUp('Please Enter Date');
      setVisiabiltyPopUp(true);
    }
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
          OnCompleteTask={OnCompleteTask}
          OnDeleteTask={OnDeleteTask}
          Period
        />
      </View>
    );
  };

  return (
    <View style={Styles.MainContainer}>
      <View style={Styles.MainContainerHeaderDate}>
        <View style={Styles.ContainerSelectDate}>
          <Text style={Styles.SelectDateTxt}>
            {StartDate ? moment(StartDate).format('D MMM, YYYY') : 'From'}
          </Text>
          <Text style={Styles.Day}>
            {StartDate && moment(StartDate).format('dddd')}
          </Text>
        </View>
        <View style={Styles.ContainerIcon}>
          <Icon
            name={'chevron-right'}
            size={30}
            color={Colors.GrayBackgroundColor}
          />
        </View>
        <View style={Styles.DueDate}>
          <Text style={Styles.SelectDateTxt}>
            {EndDate ? moment(EndDate).format('D MMM, YYYY') : 'To'}
          </Text>

          <Text style={Styles.Day}>
            {EndDate && moment(EndDate).format('dddd')}
          </Text>
        </View>
      </View>
      <ScrollView>
        <Text style={Styles.RetrieveTasksTxt}>
          Retrieve Tasks in period of Time:
        </Text>

        <CalendarList
          markingType={'custom'}
          markedDates={markedDate[0]}
          markingType={'multi-dot'}
          pastScrollRange={20}
          futureScrollRange={20}
          style={{marginTop: 15}}
          hideDayNames={true}
          horizontal={true}
          pagingEnabled={true}
          theme={{
            calendarBackground: '#FAFAFA',
            textDayFontWeight: 'bold',
            textDisabledColor: Colors.placeHolder,
            todayTextColor: Colors.MainColor,
            dayTextColor: '#000',
            monthTextColor: Colors.MainColor,
            textDayFontSize: 10,
            textMonthFontSize: 10,
            textDayHeaderFontSize: 10,
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
          }}
          current={new Date()}
          onDayPress={(day) => OnChangeDay(day)}
          onDayLongPress={(day) => OnLongPress(day)}
        />
        <Button
          title={'Continue'}
          Customstyle={Styles.AddTaskBtn}
          BtnTitleStyle={Styles.TitleBtn}
          onPress={OnContinue}
        />
      </ScrollView>
      <PopUp
        visible={PopupModel}
        message={MessagePopUp}
        LeftBtnName={'OK'}
        topIcon={Icons.WrongPopUp}
        LeftBtnFunction={PopupactionFunction}
      />

      <SwipeUpDownModal
        modalVisible={ShowModal}
        //if you don't pass HeaderContent you should pass marginTop in view of ContentModel to Make modal swipeable
        ContentModal={
          <View style={{flex: 1, marginTop: 40, backgroundColor: '#E6EFF6'}}>
            {FilteredList.length > 0 ? (
              <FlatList
                data={FilteredList}
                renderItem={({item, index}) => renderTasks(item, index)}
                keyExtractor={(item) => item.id.toString()}
              />
            ) : (
              <EmptyState
                MessageTitle={'Nothing TODO in this period'}
                IconsName={'calendar-blank-multiple'}
                titleStyle={{fontSize: 18, letterSpacing: 0.7}}
              />
            )}
          </View>
        }
        HeaderStyle={Styles.headerContent}
        ContentModalStyle={Styles.Modal}
        HeaderContent={
          <View style={Styles.containerHeader}>
            <View style={Styles.ModalHeadr} />
          </View>
        }
        onClose={() => {
          setShowModel(false);
        }}
      />
    </View>
  );
};

export default PeriodTasks;
