import axios from 'axios';

export default function fetchDemoData(status) {
  return function fetchData(dispatch) {
    dispatch({ type: 'FETCH_REQUESTS' });
    axios.get(`/demo/v1/fetchReqData/${status.toLowerCase()}`)
      .then((response) => {
        dispatch({ type: 'FETCH_REQUESTS_FULFILLED', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_REQUESTS_REJECTED', payload: err });
      });
  };
}
