/* eslint no-undef: "off" */

import config from '../../config';

export const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM';
export const UPDATE_WEATHER_DATA = 'UPDATE_WEATHER_DATA';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SET_IS_FAHRENHEIT = 'SET_IS_FAHRENHEIT';

/**
 * updateSearchTerm - set new search term
 * @param  {string} searchTerm - what the user entered
 * @return {object} Action
 */
export function updateSearchTerm(searchTerm) {
    return {
        type: UPDATE_SEARCH_TERM,
        searchTerm,
    };
}

/**
 * updateWeatherData - set data from API response
 * @param  {object} weatherData - response from API
 * @return {object} Action
 */
export function updateWeatherData(weatherData) {
    return {
        type: UPDATE_WEATHER_DATA,
        weatherData,
    };
}

/**
 * setErrorMessage - change or show error message
 * @param {object} errorMessage - message to display
 * @return {object} Action
 */
export function setErrorMessage(errorMessage) {
    return {
        type: SET_ERROR_MESSAGE,
        errorMessage,
    };
}

/**
 * setIsLoading - show or hide loading spinner
 * @param {boolean} isLoading
 * @return {object} Action
 */
export function setIsLoading(isLoading) {
    return {
        type: SET_IS_LOADING,
        isLoading,
    };
}

/**
 * setIsFahrenheit - toggle between F and C temperatures
 * @param {Boolean} isFahrenheit
 * @return {object} Action
 */
export function setIsFahrenheit(isFahrenheit) {
    return {
        type: SET_IS_FAHRENHEIT,
        isFahrenheit,
    };
}

export function searchByCity(searchTerm) {
    return (dispatch) => {
        const { appid, url } = config;
        dispatch(setIsLoading(true));
        return fetch(`${url}?q=${searchTerm}&appid=${appid}`)
            .then(response => response.json())
            .then((data) => {
                dispatch(setErrorMessage(''));
                dispatch(setIsLoading(false));
                dispatch(updateWeatherData(data));
            })
            .catch(() => {
                dispatch(updateWeatherData({}));
                dispatch(setErrorMessage(`Could not fetch weather for ${searchTerm}`));
            });
    };
}

export function searchByCoordinates(latitude, longitude) {
    return (dispatch) => {
        const { appid, url } = config;
        dispatch(setIsLoading(true));
        return fetch(`${url}?lat=${latitude}&lon=${longitude}&appid=${appid}`)
            .then(response => response.json())
            .then((data) => {
                dispatch(setErrorMessage(''));
                dispatch(setIsLoading(false));
                dispatch(updateWeatherData(data));
            })
            .catch(() => {
                dispatch(updateWeatherData({}));
                dispatch(setErrorMessage('Could not fetch weather for your location'));
            });
    };
}
