/**
 * @description     Express router to route the requests to controllers.
 */

import express from 'express';
import fetchReqData from './controllers/requestDataController';
import { getTodos, addTodo, deleteTodo, updateTodo } from './controllers/todoController';

const router = express.Router();
const servicePath = '/demo/v1';

router.get('/status.html', (req, res) => {
  const response = '<h1>Redux-Node-App is up and running..!</h1>';
  res.status(200).send(response);
});

router.get('/', (req, res) => {
  res.render('./index.html');
});

router.get(`${servicePath}/fetchReqData/:status`, fetchReqData);

// Routes for TODO
router.get(`${servicePath}/getTodos`, getTodos);
router.post(`${servicePath}/addTodo`, addTodo);
router.delete(`${servicePath}/deleteTodo/:todoID`, deleteTodo);
router.put(`${servicePath}/updateToDo`, updateTodo);

export default router;
