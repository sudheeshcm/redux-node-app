import React from 'react';
import TodoList from '../components/todoList';

export default class Todos extends React.Component {
  componentWillMount() {
  }
  render() {
    return (
      <div>
        <h1>Todos</h1>
        <TodoList />
      </div>
    );
  }
}
