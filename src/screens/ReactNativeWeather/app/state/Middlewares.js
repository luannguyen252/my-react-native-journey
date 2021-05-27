import * as actions from './Actions';
import type * as Types from './Types';

export const mainMiddleware = function (store) {
  return function (next) {
    return function (action: Types.Action) {
      if (action.type === actions.TYPES.request_refresh_weather_data) {
        requestRefreshWeatherData(action.payload);
      }
      else if (action.type === actions.TYPES.request_add_to_watchlist) {
        requestAddToWatchlist(action.payload);
      }
      else {
        return next(action);
      }
      
    };
  };
};

function requestAddToWatchlist(location: string): void {
}

function requestRefreshWeatherData(userid: string): void {
}