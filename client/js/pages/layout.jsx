import React, { PropTypes } from 'react';
import Footer from '../components/layout/Footer';
import Nav from '../components/layout/Nav';

class Layout extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.object,
  }
  componentWillMount() {
  }
  render() {
    const { location } = this.props;
    return (
      <div>
        <Nav location={location} />
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1 className='app-header'>Redux Node App</h1>
              {this.props.children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
export default Layout;
