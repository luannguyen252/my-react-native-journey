import type * as Types from './Types';
import * as actions from './Actions';
import {ToastAndroid} from 'react-native';
import * as _ from 'lodash';

const EMPTY_USER: User     = {
  isAnon           : true,
  name             : 'anonymous',
  userid           : '123',
  profilePictureUrl: 'http://123.com/',
};
const INIT_STATE: AppState = {
  user     : EMPTY_USER,
  locations: [],
  reports  : [],
};

export const appReducer = (state: Types.AppState = INIT_STATE, action: Types.Action,
): Types.AppState => {
  switch (action.type) {
    case actions.TYPES.set_watchlist: {
      return setWatchlist(state, action.payload);
    }
    case actions.TYPES.set_weather_data: {
      return setWeatherData(state, action.payload);
    }
    case actions.TYPES.set_user_object: {
      return setUserObject(state, action.payload);
    }
  }
  return state;
};

function setWatchlist(state: Types.AppState, locations: LocationWatchList,
): Types.AppState {
  ToastAndroid.show("REDUCER: SET WATCH LIST", ToastAndroid.SHORT);
  return {
    ...state,
    locations: _.cloneDeep(locations),
  };
}

function setWeatherData(state: Types.AppState, reports: WeatherReports) {
  ToastAndroid.show("REDUCER: SET WEATHER DATA", ToastAndroid.SHORT);
  return {
    ...state,
    reports: _.cloneDeep(reports),
  };
}

function setUserObject(state: Types.AppState, user: User) {
  ToastAndroid.show("REDUCER: SET USER OBJECT", ToastAndroid.SHORT);
  return {
    ...state,
    user: _.cloneDeep(user),
  };
}