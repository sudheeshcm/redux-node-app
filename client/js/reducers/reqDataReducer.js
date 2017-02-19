export default function reducer(state = {
  reqData: [],
  status: 'All',
  fetching: false,
  fetched: false,
  error: null,
}, action) {
  switch (action.type) {
    case 'TOGGLE_STATUS':
      {
        return { ...state,
          status: action.payload,
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
        };
      }
    default:
      {
        return { ...state,
        };
      }
  }
}
