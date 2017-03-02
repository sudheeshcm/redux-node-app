import React from 'react';
import TodoEntry from '../components/todoEntry';
import TodoList from '../components/todoList';

export default class Todos extends React.Component {
  componentWillMount() {
  }
  render() {
    return (
      <div>
        <h1>Todos</h1>
        <TodoEntry />
        <TodoList />
      </div>
    );
  }
}
