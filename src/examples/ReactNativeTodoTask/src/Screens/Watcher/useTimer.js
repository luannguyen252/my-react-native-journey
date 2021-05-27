import {useCallback, useState} from 'react';
import {getMultiple, multiSet, removeFew} from './asyncStorage';
import BackgroundTimer from 'react-native-background-timer';

export default function useTimer() {
  const [TotalSeconds, setTotalSeconds] = useState(0);

  const resumeTimer = async () => {
    let keys = ['@START_TIME'];
    const values = await getMultiple(keys);
    const START_TIME = values[0][1];
    if (START_TIME !== null) {
      const millis = Date.now() - parseFloat(START_TIME);
      setTotalSeconds(Math.floor(millis / 1000));
      runTimerInBackground();
    }
  };

  const runTimerInBackground = useCallback(() => {
    BackgroundTimer.runBackgroundTimer(() => {
      setTotalSeconds((prevState) => prevState + 1);
    }, 1000);
  }, []);

  const rmTimeTaskAddSpentTimeToAsync = async () => {
    const rmKeys = ['@START_TIME', '@TASK_NAME'];
    const timeFormatted = getTimeFormated();
    const lastSpentTime = ['@SPEND_TIME', timeFormatted];
    await removeFew(rmKeys);
    await multiSet([lastSpentTime]);
  };

  const getTimeFormated = useCallback(() => {
    let timeFormatted = '';
    let hours = Math.floor(TotalSeconds / 3600) + '';
    let minutes = parseInt((TotalSeconds / 60) % 60) + '';
    let seconds = (TotalSeconds % 60) + '';

    if (hours.length < 2) {
      timeFormatted = '0' + hours + ':';
    } else {
      timeFormatted = hours + ':';
    }

    if (minutes.length < 2) {
      timeFormatted = timeFormatted + '0' + minutes + ':';
    } else {
      timeFormatted = timeFormatted + minutes + ':';
    }

    if (seconds.length < 2) {
      timeFormatted = timeFormatted + '0' + seconds;
    } else {
      timeFormatted = timeFormatted + seconds;
    }
    return timeFormatted;
  }, [TotalSeconds]);

  const addTimeTaskToAsync = useCallback(async (timeNow, taskName) => {
    const START_TIME = ['@START_TIME', timeNow.toString()];
    const TASK_NAME = ['@TASK_NAME', taskName];
    await multiSet([START_TIME, TASK_NAME]);
  }, []);

  return {
    TotalSeconds,
    setTotalSeconds,
    runTimerInBackground,
    resumeTimer,
    getTimeFormated,
    rmTimeTaskAddSpentTimeToAsync,
    addTimeTaskToAsync,
  };
}
