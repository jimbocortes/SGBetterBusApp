import { combineReducers } from 'redux';
import bus_stops from './bus_stops_reducer';
import bus_arrivals from './bus_arrivals_reducer';

export default combineReducers({
  bus_stops,
  bus_arrivals
});
