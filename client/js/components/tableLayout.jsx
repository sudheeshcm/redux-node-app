import moment from 'moment';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import fetchDemoData from '../actions/reqDataActions';

@connect(store => ({
  reqData: store.reqData,
  status: store.status,
}))
export default class TableLayout extends React.Component {
  static propTypes = {
    reqData: PropTypes.func,
    dispatch: PropTypes.func,
    status: PropTypes.string,
  }
  componentWillMount() {
    this.props.dispatch(fetchDemoData(this.props.status));
  }
  render() {
    const { reqData } = this.props;
    const mappedReqData = reqData.map((item) => {
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

    return (<div>
      <div className="table-responsive">
        <table className="table-hover data-table">
          <thead>
            <tr className="tb-header">
              <th>Title</th>
              <th>Status</th>
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
