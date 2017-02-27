import log from '../utils/logger';
import Todo from '../models/todo';

function sendErrorResponse(error, res) {
  let errorMsg = {
    error,
  };
  log.error(`Error in TODO controller: ${error}`);
  errorMsg = JSON.stringify(errorMsg);
  res.status(400).send(errorMsg);
}

function fetchAllTodos(res) {
  Todo.find({}, (err, todos) => {
    if (err) {
      sendErrorResponse(err, res);
    }
    res.json(todos);
  });
}

export function getTodos(req, res) {
  fetchAllTodos(res);
}


export function addTodo(req, res) {
  try {
    Todo.create({
      text: req.body.text,
      done: false,
    }, (err) => {
      if (err) {
        sendErrorResponse(err, res);
      }
      fetchAllTodos(res);
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export function deleteTodo(req, res) {
  Todo.findOneAndRemove({
    _id: req.params.todoID,
  }, (err) => {
    if (err) {
      sendErrorResponse(err, res);
    }
    fetchAllTodos(res);
  });
}

export function updateTodo(req, res) {
  try {
    Todo.findOneAndUpdate({
      _id: req.body.todoID,
    }, {
      text: req.body.text,
      done: req.body.done,
    }, {}, (err) => {
      if (err) {
        sendErrorResponse(err, res);
      }
      fetchAllTodos(res);
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}
