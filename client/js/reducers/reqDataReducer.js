import _ from 'lodash';

function filterData(data, status) {
  return status !== 'All' ? data.filter(item => item.status === status) : data;
}

function sortData(data) {
  return data.sort((firstItem, secondItem) => {
    const firstStatus = firstItem.status.toUpperCase();
    const secondStatus = secondItem.status.toUpperCase();
    if (firstStatus < secondStatus) {
      return -1;
    }
    if (firstStatus > secondStatus) {
      return 1;
    }
    return 0;
  });
}

export default function reducer(state = {
  reqData: [],
  displayedData: [],
  status: 'All',
  sorted: false,
  fetching: false,
  fetched: false,
  error: null,
  todos: [],
}, action) {
  switch (action.type) {
    case 'TOGGLE_STATUS':
      {
        const reqData = _.clone(state.reqData);
        let filteredData;
        switch (action.payload) {
          case 'All':
            filteredData = reqData;
            break;
          case 'Approved':
          case 'Denied':
          case 'Pending':
            filteredData = filterData(reqData, action.payload);
            break;
          default:
            return null;
        }
        return { ...state,
          status: action.payload,
          displayedData: filteredData,
        };
      }
    case 'TOGGLE_SORT':
      {
        const reqData = _.clone(state.reqData);
        const filteredData = state.sorted ?
          filterData(reqData, state.status) : sortData(state.displayedData);
        return { ...state,
          sorted: !state.sorted,
          displayedData: filteredData,
        };
      }
    case 'DELETE_ROW':
      {
        const filteredData = _.clone(state.displayedData);
        filteredData.splice(action.payload, 1);
        return { ...state,
          displayedData: filteredData,
        };
      }
    case 'ADD_TODO_FULFILLED':
      {
        return { ...state,
          todos: action.payload,
        };
      }
    case 'ADD_TODO_REJECTED':
      {
        return { ...state,
          error: action.payload,
        };
      }
    case 'DELETE_TODO_FULFILLED':
      {
        return { ...state,
          todos: action.payload,
        };
      }
    case 'DELETE_TODO_REJECTED':
      {
        return { ...state,
          error: action.payload,
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
          displayedData: _.clone(action.payload.reqData),
        };
      }
    case 'FETCH_TODOS':
      {
        return { ...state,
          fetching: true,
          fetched: false,
        };
      }
    case 'FETCH_TODOS_ERROR':
      {
        return { ...state,
          fetching: false,
          fetched: false,
          error: action.payload,
        };
      }
    case 'FETCH_TODOS_FULFILLED':
      {
        return {
          ...state,
          fetching: false,
          fetched: true,
          todos: action.payload,
        };
      }
    default:
      {
        return { ...state,
        };
      }
  }
}
