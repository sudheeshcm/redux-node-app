import moment from 'moment';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { fetchDemoData, toggleStatusSort,
  deleteReqRow } from '../actions/reqDataActions';

@connect(store => ({
  displayedData: store.displayedData,
  status: store.status,
  sorted: store.sorted,
}))
export default class TableLayout extends React.Component {
  static propTypes = {
    displayedData: PropTypes.func,
    dispatch: PropTypes.func,
    status: PropTypes.string,
  }
  componentWillMount() {
    this.props.dispatch(fetchDemoData(this.props.status));
  }
  deleteRow(index) {
    this.props.dispatch(deleteReqRow(index));
  }
  render() {
    const { displayedData, dispatch } = this.props;
    const mappedReqData = displayedData.map((item, index) => {
      const createdDate =
        moment(item.created_at, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
      const updatedDate =
        moment(item.updated_at, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
      return (<tr key={item.id} className={`tb-row ${item.status}`}>
        <th>{item.title}</th>
        <td>{item.status}</td>
        <td>{updatedDate.toString()}</td>
        <td>{createdDate.toString()}</td>
        <td>
          <Button
            bsStyle="link" onClick={() => this.deleteRow(index)}
            className="delete-btn"
          >
            delete
          </Button>
        </td>
      </tr>);
    });
    function toggleSort() {
      dispatch(toggleStatusSort());
    }
    return (<div>
      <div className="table-responsive">
        <table className="table-hover data-table">
          <thead>
            <tr className="tb-header">
              <th>Title</th>
              <th>
                <button className="sort-btn" onClick={toggleSort}>
                  Status
                  <img
                    className="sort-icn" src="images/sorticon.png"
                    role="presentation"
                  />
                </button>
              </th>
              <th>Updated</th>
              <th>Created</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {mappedReqData}
          </tbody>
        </table>
      </div>
    </div>);
  }
}
