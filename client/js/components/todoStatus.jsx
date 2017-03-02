import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { updateTodo } from '../actions/todoActions';

@connect(store => ({
  todos: store.todos,
}))
class TodoStatus extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    done: PropTypes.bool,
    dispatch: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      id: props.id,
      done: props.done,
    };
    this.toggleStatus = this.toggleStatus.bind(this);
  }
  toggleStatus() {
    this.props.dispatch(
      updateTodo(this.state.id, this.state.text, !this.state.done));
    this.setState({ done: !this.state.done });
  }
  render() {
    return (
      <Button
        bsStyle="link"
        onClick={this.toggleStatus}
        className="status-btn"
      >
        {this.state.done ? 'Done' : 'Pending'}
      </Button>
    );
  }
}
export default TodoStatus;
