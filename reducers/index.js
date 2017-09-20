import { combineReducers } from 'redux';
import bus_stops from './bus_stops_reducer';
import bus_arrivals from './bus_arrivals_reducer';
import current_location from './current_location';

export default combineReducers({
  bus_stops,
  bus_arrivals,
  current_location
});
