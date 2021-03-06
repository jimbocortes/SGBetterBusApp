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
      // const { latitude, longitude } = {
      //   latitude: 1.3499760598860455,
      //   longitude: 103.74675391120903
      // };

      dispatch({
        type: FETCH_CURRENT_LOCATION,
        payload: { longitude, latitude }
      });
    }
  } catch (e) {
    console.error(`Exception: ${e}`);
  }
};
