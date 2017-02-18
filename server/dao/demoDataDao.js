import demoData from '../models/demoData';
import log from '../utils/logger';

export default function getDemoData() {
  log.info('fetching demoData..');
  return demoData;
}
