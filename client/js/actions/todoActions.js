import axios from 'axios';

export function getTodos() {
  return function getAll(dispatch) {
    dispatch({
      type: 'FETCH_TODOS',
    });
    axios.get('/demo/v1/getTodos')
      .then((response) => {
        dispatch({
          type: 'FETCH_TODOS_FULFILLED',
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: 'FETCH_TODOS_REJECTED',
          payload: err,
        });
      });
  };
}

export function addTodo(text) {
  return function addItem(dispatch) {
    const trimmedText = text.trim();
    if (trimmedText) {
      axios.post('/demo/v1/addTodo', {
        text: trimmedText,
      }).then((response) => {
        dispatch({
          type: 'FILL_TODO_FULFILLED',
          payload: response.data,
        });
      }).catch((err) => {
        dispatch({
          type: 'FILL_TODO_REJECTED',
          payload: err,
        });
      });
    }
  };
}

export function updateTodo(id, text, done) {
  return function updateItem(dispatch) {
    const trimmedText = text.trim();
    if (trimmedText) {
      axios.put('/demo/v1/updateTodo', {
        todoID: id,
        text: trimmedText,
        done,
      }).then((response) => {
        dispatch({
          type: 'FILL_TODO_FULFILLED',
          payload: response.data,
        });
      }).catch((err) => {
        dispatch({
          type: 'FILL_TODO_REJECTED',
          payload: err,
        });
      });
    }
  };
}

export function deleteTodo(id) {
  return function deleteItem(dispatch) {
    axios.delete(`/demo/v1/deleteTodo/${id}`)
      .then((response) => {
        dispatch({
          type: 'DELETE_TODO_FULFILLED',
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: 'DELETE_TODO_REJECTED',
          payload: err,
        });
      });
  };
}
