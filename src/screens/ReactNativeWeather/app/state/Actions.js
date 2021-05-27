import type * as Types from './Types';
import * as _ from 'lodash';

export const TYPES = {
  request_refresh_weather_data: 0,
  request_add_to_watchlist    : 1,
  set_watchlist               : 2,
  set_weather_data            : 3,
  set_user_object             : 4,
};

export function request_refresh_weather_data_action(userid: string): Types.Action {
  return {
    type   : TYPES.request_refresh_weather_data,
    payload: userid,
  };
}

export function request_add_to_watchlist_action(location: string): Types.Action {
  return {
    type   : TYPES.request_add_to_watchlist,
    payload: location,
  };
}

export function set_watch_action(locations: Array<string>): Types.Action {
  return {
    type   : TYPES.set_watchlist,
    payload: locations,
  };
}

export function set_weather_data_action(weatherreports: WeatherReports): Types.Action {
  return {
    type   : TYPES.set_weather_data,
    payload: weatherreports,
  };
}

export function set_user_object_action(user: User): Types.Action {
  let retval = {};
  if (_.isNil(user)) {
    retval = {
      type   : TYPES.set_user_object,
      payload: {
        isAnon           : false,
        name             : Math.random().toString(36).substring(7),
        userid           : Math.random().toString(36).substring(7),
        profilePictureUrl: Math.random().toString(36).substring(7),
      },
    };
  }
  else {
    retval = {
      type   : TYPES.set_user_object,
      payload: user,
    };
  }
  return retval;
}