import { FETCH_CURRENT_LOCATION } from './types';
import { Permissions, Location } from 'expo';

export const fetchCurrentLocation = () => async dispatch => {
  try {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      dispatch({ type: FETCH_CURRENT_LOCATION, payload: {} });
    } else {
      let location = await Location.getCurrentPositionAsync({});

      console.log('<fetchCurrentLocation');
      console.log(location);
      console.log('fetchCurrentLocation>');
      const { latitude, longitude } = location.coords;

      dispatch({
        type: FETCH_CURRENT_LOCATION,
        payload: { longitude, latitude }
      });
    }
  } catch (e) {
    console.error(`Exception: ${e}`);
  }
};
