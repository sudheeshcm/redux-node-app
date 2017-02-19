/**
* @description     Express router to route the requests to controllers.
*/

import express from 'express';
import fetchReqData from './controllers/requestDataController';

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
export default router;
