
import React from 'react';
import TableLayout from '../components/tableLayout';
import DropDown from '../components/statusDropDown';

export default class Requests extends React.Component {
  componentWillMount() {
  }
  render() {
    return (
      <div className="main">
        <h2 className="sub-header req-header"> Requests </h2>
        <DropDown />
        <TableLayout />
      </div>
    );
  }
}
