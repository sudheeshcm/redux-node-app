import demoData from '../models/demoData';
import log from '../utils/logger';

function filterData(data, status) {
  return data.filter(item => item.status.toLowerCase() === status);
}

export default function getDemoData(status) {
  log.info('fetching demoData..');
  switch (status) {
    case 'all':
      return demoData;
    case 'approved':
    case 'denied':
    case 'pending':
      return filterData(demoData, status);
    default:
      return null;
  }
}
