import axios from "axios";

export function fetchDemoData() {
  return function(dispatch) {
    dispatch({type: "FETCH_REQUESTS"});
    axios.get("/demo/v1/fetchReqData")
      .then((response) => {
        dispatch({type: "FETCH_REQUESTS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_REQUESTS_REJECTED", payload: err})
      })
  }
}