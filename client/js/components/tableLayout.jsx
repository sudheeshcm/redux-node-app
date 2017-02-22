import moment from 'moment';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchDemoData, toggleStatusSort } from '../actions/reqDataActions';

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
    sorted: PropTypes.bool,
  }
  componentWillMount() {
    this.props.dispatch(fetchDemoData(this.props.status));
  }
  render() {
    const { displayedData, status, sorted, dispatch } = this.props;
    const mappedReqData = displayedData.map((item) => {
      const createdDate = moment(item.created_at, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
      const updatedDate = moment(item.updated_at, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
      return (<tr key={item.id} className={`tb-row ${item.status}`}>
        <th>{item.title}</th>
        <td>{item.status}</td>
        <td>{updatedDate.toString()}</td>
        <td>{createdDate.toString()}</td>
        <td>delete</td>
      </tr>);
    });
    function toggleSort() {
      dispatch(toggleStatusSort(status, sorted));
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
                  <img className="sort-icn" src="images/sorticon.png" role="presentation" />
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
