import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';
import toggleReqData from '../actions/dropDownActions';
import fetchDemoData from '../actions/reqDataActions';

 @connect(store => ({
   status: store.status,
 }))
export default class DropDown extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    status: PropTypes.string,
  };
  toggleReqData(status) {
    this.props.dispatch(toggleReqData(status));
    this.props.dispatch(fetchDemoData(status));
  }
  render() {
    const { status } = this.props;
    const self = this;
    function renderDropdownButton(title, i) {
      return (
        <DropdownButton
          bsStyle="default" title={status} key={i} id={`status-${i}`}
          onSelect={(evt) => { self.toggleReqData(evt); }}
        >
          <MenuItem eventKey="All" active>All</MenuItem>
          <MenuItem eventKey="Approved">Approved</MenuItem>
          <MenuItem eventKey="Denied">Denied</MenuItem>
          <MenuItem eventKey="Pending">Pending</MenuItem>
        </DropdownButton>
      );
    }
    const buttonsInstance = (
      <ButtonToolbar>{renderDropdownButton({ status })}</ButtonToolbar>
    );
    return (<div>
      { buttonsInstance }
    </div>);
  }
}
