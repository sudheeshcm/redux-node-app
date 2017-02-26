import mongoose from 'mongoose';
import configManager from '../utils/configManager';

const appConfig = configManager.getConfig('app');
mongoose.connect(appConfig.dbURL);

export default mongoose.model('Todo', {
  text: {
    type: String,
    default: '',
  },
  done: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
  },
});
