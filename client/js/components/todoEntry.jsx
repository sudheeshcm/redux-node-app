import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormControl, Button } from 'react-bootstrap';
import { addTodo } from '../actions/todoActions';

@connect(store => ({
  todos: store.todos,
}))
export default class TodoEntry extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    return (
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
    );
  }
}
