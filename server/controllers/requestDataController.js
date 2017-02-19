/**
 * @author          Sudheesh CM
 * @createdDate:    18 Feb 2017
 * @description     Controller to fetch demo data
 */

import log from '../utils/logger';
import getDemoData from '../dao/demoDataDao';

function sendErrorResponse(error, res) {
  let errorMsg = {
    error,
  };
  errorMsg = JSON.stringify(errorMsg);
  res.status(400).send(errorMsg);
}

function fetchReqData(req, res) {
  try {
    const status = req.params.status;
    log.info('Server procesing request - fetchReqData', status);
    const reqData = getDemoData(status);
    if (reqData) {
      log.info('data found.');
      res.status(200).send({ reqData });
    } else {
      log.error('data not found.');
      res.status(404).end();
    }
  } catch (error) {
    log.error(`Error in fetchReqData controller ${error}`);
    sendErrorResponse(error, res);
  }
}

export default fetchReqData;
