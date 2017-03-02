import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { getTodos, deleteTodo } from '../actions/todoActions';
import Todo from './todo';
import TodoStatus from './todoStatus';

@connect(store => ({
  todos: store.todos,
}))
export default class TodoList extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    todos: PropTypes.func,
  }
  componentWillMount() {
    this.props.dispatch(getTodos());
  }
  deleteTodo(id) {
    this.props.dispatch(deleteTodo(id));
  }
  render() {
    const { todos } = this.props;
    const mappedTodos = todos.map(item => (
      <tr key={item._id}>
        <td>
          <Todo
            id={item._id} text={item.text} done={item.done}
          />
        </td>
        <td>
          <TodoStatus
            id={item._id} text={item.text} done={item.done}
          />
        </td>
        <td>
          <Button
            bsStyle="link"
            onClick={() => this.deleteTodo(item._id)}
            className="delete-btn"
          >
            <img
              className="delete-icn"
              src="images/delete-icon.png"
              role="presentation"
            />
          </Button>
        </td>
      </tr>
      ),
    );
    return (
      <div className="table-responsive">
        <table className="table-hover table-striped data-table">
          <thead>
            <tr className="tb-header">
              <th>Todo</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {mappedTodos}
          </tbody>
        </table>
      </div>
    );
  }
}
