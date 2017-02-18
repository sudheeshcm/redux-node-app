import React from "react"
import { connect } from "react-redux"

import {fetchDemoData} from "../actions/reqDataActions"

@connect((store) => {
  return {
    reqData: store.reqData,
  };
})
export default class Layout extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchDemoData());
  }

  render() {
    const { reqData } = this.props;
    const mappedReqData = reqData.map(item =>
      <tr key={item.id} class="tb-row">
        <th>{item.title}</th>
        <td>{item.status}</td>
        <td>{item.updated_at}</td>
        <td>{item.created_at}</td>
        <td>delete</td>
      </tr>)

    return <div>
      <div class="table-responsive">
        <table class="table-hover table-striped data-table">
          <thead>
            <tr class="tb-header">
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
    </div>
  }
}