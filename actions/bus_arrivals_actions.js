import axios from 'axios';
import qs from 'qs';
import { FETCH_BUS_ARRIVAL, SGBB_API_ROOT_URL } from './types';

const buildFetchBusUrl = params => {
  const queryString = qs.stringify(params);
  const path = `${SGBB_API_ROOT_URL}/bus_arrivals?${queryString}`;
  return path;
};

export const fetchBusArrival = busStopCode => async dispatch => {
  console.log(`fetching ${busStopCode}`);
  try {
    const url = buildFetchBusUrl({ bus_stop_id: busStopCode });
    console.log(`url: ${url}`);

    const { data } = await axios.get(url);
    dispatch({ type: FETCH_BUS_ARRIVAL, payload: data });
  } catch (e) {
    console.error(`Exception He: ${e}`);
  }
};
