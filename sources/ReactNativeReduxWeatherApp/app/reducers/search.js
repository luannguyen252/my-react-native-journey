import {
    UPDATE_SEARCH_TERM,
    UPDATE_WEATHER_DATA,
    SET_ERROR_MESSAGE,
    SET_IS_LOADING,
    SET_IS_FAHRENHEIT,
} from '../actions';

const initialState = {
    city: '',
    weatherData: {},
    errorMessage: '',
    isLoading: false,
    isFahrenheit: false,
};

const searchReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case UPDATE_SEARCH_TERM: {
            return Object.assign({}, state, {
                city: action.searchTerm,
            });
        }
        case UPDATE_WEATHER_DATA: {
            return Object.assign({}, state, {
                weatherData: action.weatherData,
            });
        }
        case SET_ERROR_MESSAGE: {
            return Object.assign({}, state, {
                errorMessage: action.errorMessage,
            });
        }
        case SET_IS_LOADING: {
            return Object.assign({}, state, {
                isLoading: action.isLoading,
            });
        }
        case SET_IS_FAHRENHEIT: {
            return Object.assign({}, state, {
                isFahrenheit: action.isFahrenheit,
            });
        }
        default:
            return state;
    }
};

export default searchReducer;
