import accelerationDuck from './acceleration';
import { combineReducers } from 'redux';
import geolocationDuck from './geolocation';
import modalDuck from './modal';
import speedDuck from './speed';
import timerDuck from './timer';
import unitMeasurementDuck from './unit-measurement';

const Reducers = combineReducers({
    accelerationDuck,
    geolocationDuck,
    modalDuck,
    speedDuck,
    timerDuck,
    unitMeasurementDuck
});

export default Reducers;
