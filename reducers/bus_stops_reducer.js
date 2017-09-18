import { SEARCH_BUS_STOPS } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case SEARCH_BUS_STOPS:
      action.payload.data.forEach(d => (d.selected = false));
      const payload = action.payload;
      const { term, currentPage, data } = payload;
      const { term: prevTerm, currentPage: prevPage, data: prevData } = state;

      if (prevTerm === term && prevPage < currentPage) {
        const appendedData = prevData.concat(data);
        return { ...payload, data: appendedData };
      } else {
        return payload;
      }
    default:
      return state;
  }
}
