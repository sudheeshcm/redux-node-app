import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormControl, Button } from 'react-bootstrap';
import { updateTodo } from '../actions/todoActions';

@connect(store => ({
  todos: store.todos,
}))
class Todo extends React.Component {
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
      value: props.text,
      editable: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showEditField = this.showEditField.bind(this);
    this.resetUpdate = this.resetUpdate.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ editable: false });
    this.setState({ text: this.state.value });
    this.props.dispatch(
      updateTodo(this.state.id, this.state.value, this.state.done));
  }
  showEditField() {
    this.setState({ editable: true });
  }
  resetUpdate() {
    this.setState({ text: this.props.text });
    this.setState({ value: this.props.text });
    this.setState({ editable: false });
  }
  render() {
    return (
      <div className="todo-item">
        <span className={this.state.editable ? 'hide-el' : ''}>
          <Button
            bsStyle="link" className="todo-item-display"
            onClick={this.showEditField}
          >
            {this.state.text}
          </Button>
        </span>
        <span className={this.state.editable ? '' : 'hide-el'}>
          <form className="update-todo-form" onSubmit={this.handleSubmit}>
            <div id="todo-updt-input" >
              <FormControl
                type="text"
                placeholder="Enter text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </div>
            <div id="todo-updt-btn">
              <Button
                bsStyle="link"
                className="glyphicon glyphicon-ok-sign"
                type="submit"
              />
              <Button
                bsStyle="link"
                className="glyphicon glyphicon-remove-sign"
                onClick={this.resetUpdate}
              />
            </div>
          </form>
        </span>
      </div>
    );
  }
}
export default Todo;
