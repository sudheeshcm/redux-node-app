import axios from 'axios';

export function fetchDemoData(status) {
  return function fetchData(dispatch) {
    dispatch({
      type: 'FETCH_REQUESTS',
    });
    axios.get(`/demo/v1/fetchReqData/${status.toLowerCase()}`)
      .then((response) => {
        dispatch({
          type: 'FETCH_REQUESTS_FULFILLED',
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: 'FETCH_REQUESTS_REJECTED',
          payload: err,
        });
      });
  };
}

export function toggleStatusSort() {
  return function toggleSort(dispatch) {
    dispatch({
      type: 'TOGGLE_SORT',
      payload: {},
    });
  };
}

export function deleteReqRow(index) {
  return function deleteRow(dispatch) {
    dispatch({
      type: 'DELETE_ROW',
      payload: index,
    });
  };
}
