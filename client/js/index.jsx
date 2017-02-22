import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import TableLayout from './components/tableLayout.jsx';
import DropDown from './components/statusDropDown.jsx';
import store from './store';

const app = document.getElementById('app');

ReactDOM.render(<Provider store={store}>
  <div className="main">
    <DropDown />
    <TableLayout />
  </div>
</Provider>, app);
