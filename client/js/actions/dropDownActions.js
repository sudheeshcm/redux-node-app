export default function toggleReqData(status) {
  return function tglReqData(dispatch) {
    dispatch({ type: 'TOGGLE_STATUS', payload: status });
  };
}
