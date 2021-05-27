import React, {useState, useEffect, useCallback} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  LayoutAnimation,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import styles from './styles';
import {Button} from '../../Components';
import useAppState from './useAppState';
import {getMultiple} from './asyncStorage';
import useTimer from './useTimer';

const WatcherTask = () => {
  const [Watcher, setWatcher] = useState(false);
  const [LastSpentTime, setLastSpentTime] = useState(null);
  const [valueTaskName, onChangeTaskName] = useState('');
  const {
    runTimerInBackground,
    resumeTimer,
    setTotalSeconds,
    getTimeFormated,
    rmTimeTaskAddSpentTimeToAsync,
    addTimeTaskToAsync,
  } = useTimer();

  const {} = useAppState({
    onBackground: () => {
      BackgroundTimer.stopBackgroundTimer();
    },
    onForeground: async () => {
      resumeTimer();
    },
  });

  useEffect(() => {
    const fetchAsyncStorage = async () => {
      const values = await getMultiple([
        '@START_TIME',
        '@SPEND_TIME',
        '@TASK_NAME',
      ]);

      if (values[0][1] !== null) {
        setWatcher(true);
        onChangeTaskName(values[2][1]);
        resumeTimer();
      } else {
        setLastSpentTime(values[1][1]);
      }
    };
    fetchAsyncStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //using call back to prevent rerender to Button
  const onStart = useCallback(() => {
    if (!Watcher) {
      addTimeTaskToAsync(Date.now(), valueTaskName);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setWatcher(true);
      runTimerInBackground();
    }
  }, [Watcher, valueTaskName, runTimerInBackground, addTimeTaskToAsync]);

  const onStop = useCallback(() => {
    if (Watcher) {
      BackgroundTimer.stopBackgroundTimer();
      const timeFormatted = getTimeFormated();
      setLastSpentTime(timeFormatted);
      rmTimeTaskAddSpentTimeToAsync();
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setWatcher(false);
      setTotalSeconds(0);
      onChangeTaskName('');
    }
  }, [
    Watcher,
    getTimeFormated,
    rmTimeTaskAddSpentTimeToAsync,
    setTotalSeconds,
  ]);

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      testID={'WATCHER-SCREEN'}>
      <View style={styles.MainContainer}>
        {!Watcher && (
          <Text style={styles.LastTimeTxt}>
            {'Last time spend in task: ' + LastSpentTime}
          </Text>
        )}

        <TextInput
          testID={'INPUT-TASK_NAME'}
          style={styles.TaskNameInput}
          placeholder="Enter Task Name"
          editable={!Watcher}
          value={valueTaskName}
          onChangeText={(text) => onChangeTaskName(text)}
        />

        <Text style={styles.TimerTxt}>
          Timer:{'  '}
          {getTimeFormated()}
        </Text>

        <View style={styles.ContianerStartStopBtns}>
          <View style={styles.SubContainerBtns}>
            <Button
              testID={'START-BTN'}
              onPress={onStart}
              Title={'Start'}
              style={styles.StartBtn}
              styleTxt={styles.StartBtnTxt}
            />

            <Button
              testID={'STOP-BTN'}
              onPress={onStop}
              Title={'Stop'}
              style={styles.StopBtn}
              styleTxt={styles.StopBtnTxt}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default WatcherTask;
