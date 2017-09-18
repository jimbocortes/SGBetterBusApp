import axios from 'axios';
import qs from 'qs';
import { SEARCH_BUS_STOPS, SGBB_API_ROOT_URL } from './types';

const buildSearchUrl = params => {
  const queryString = qs.stringify(params);
  const path = `${SGBB_API_ROOT_URL}/search?${queryString}`;
  return path;
};

export const searchBusStops = (term, page = 1) => async dispatch => {
  console.log('searching');
  try {
    const url = buildSearchUrl({ term, page });
    console.log(`url: ${url}`);

    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    let { data } = await axios.get(url, {
      cancelToken: source.token
    });

    dispatch({ type: SEARCH_BUS_STOPS, payload: data });
  } catch (e) {
    console.error(`Exception He: ${e}`);
  }
};
