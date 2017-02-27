import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import store from './store';
import Layout from './pages/layout.jsx';
import Todos from './pages/todos.jsx';
import Requests from './pages/requests.jsx';

const app = document.getElementById('app');

ReactDOM.render(<Provider store={store}>
  <div>
    <Router history={hashHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Todos} />
        <Route path="requests" name="requests" component={Requests} />
      </Route>
    </Router>,
  </div>
</Provider>, app);
