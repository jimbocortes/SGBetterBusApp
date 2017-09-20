import { FETCH_CURRENT_LOCATION } from './types';

export const fetchCurrentLocation = () => async dispatch => {
  console.log('fetchingCurrentLocation');
  try {
    dispatch({ type: FETCH_CURRENT_LOCATION, payload: null });
  } catch (e) {
    console.error(`Exception He: ${e}`);
  }
};
