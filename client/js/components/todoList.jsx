// import moment from 'moment';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormControl, Button } from 'react-bootstrap';
import { getTodos, deleteTodo, addTodo } from '../actions/todoActions';

@connect(store => ({
  todos: store.todos,
}))
export default class TodoList extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    todos: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    this.props.dispatch(getTodos());
  }
  deleteTodo(id) {
    this.props.dispatch(deleteTodo(id));
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(addTodo(this.state.value));
    this.setState({ value: '' });
  }
  render() {
    const { todos } = this.props;
    const mappedTodos = todos.map(item => (
      <tr key={item._id}>
        <td>{item.text}</td>
        <td>{item.done.toString()}</td>
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
    return (<div>
      <div className="add-todo-ctrl">
        <form onSubmit={this.handleSubmit}>
          <div>
            <FormControl
              type="text"
              placeholder="Enter text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <Button
              bsStyle="primary"
              className="add-todo-btn"
              type="submit"
            >
              Add Todo
            </Button>
          </div>
        </form>
      </div>
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
    </div>);
  }
}
