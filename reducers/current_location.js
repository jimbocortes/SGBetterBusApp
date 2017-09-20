import { FETCH_CURRENT_LOCATION } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CURRENT_LOCATION:
      return state;
    default:
      return state;
  }
}
