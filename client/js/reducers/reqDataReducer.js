function filterData(data, status) {
  return data.filter(item => item.status === status);
}

export default function reducer(state = {
  reqData: [],
  displayedData: [],
  status: 'All',
  fetching: false,
  fetched: false,
  error: null,
}, action) {
  switch (action.type) {
    case 'TOGGLE_STATUS':
      {
        let filteredData;
        switch (action.payload) {
          case 'All':
            filteredData = state.reqData;
            break;
          case 'Approved':
          case 'Denied':
          case 'Pending':
            filteredData = filterData(state.reqData, action.payload);
            break;
          default:
            return null;
        }
        return { ...state,
          status: action.payload,
          displayedData: filteredData,
        };
      }
    case 'FETCH_REQUESTS':
      {
        return { ...state,
          fetching: true,
          fetched: false,
        };
      }
    case 'FETCH_REQUESTS_ERROR':
      {
        return { ...state,
          fetching: false,
          fetched: false,
          error: action.payload,
        };
      }
    case 'FETCH_REQUESTS_FULFILLED':
      {
        return {
          ...state,
          fetching: false,
          fetched: true,
          reqData: action.payload.reqData,
          displayedData: action.payload.reqData,
        };
      }
    default:
      {
        return { ...state,
        };
      }
  }
}
