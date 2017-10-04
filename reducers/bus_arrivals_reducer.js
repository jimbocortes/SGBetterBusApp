import { FETCH_BUS_ARRIVAL } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_BUS_ARRIVAL:
      return action.payload.Services;
    default:
      return state;
  }
}
