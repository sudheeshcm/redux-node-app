import React from 'react';
import { IndexLink, Link } from 'react-router';

export default class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: true,
    };
  }
  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  }

  render() {
    const { collapsed } = this.state;
    const navClass = collapsed ? 'collapse' : '';
    const isActive = this.context.router.isActive('/', true);
    return (
      <nav
        className="navbar navbar-inverse navbar-fixed-top"
        role="navigation"
      >
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              onClick={() => this.toggleCollapse()}
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
          </div>
          <div
            className={`navbar-collapse ${navClass}`}
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav">
              <li>
                <IndexLink
                  to="/" className={isActive ? 'active' : ''}
                  onClick={() => this.toggleCollapse()}
                >
                  Todos
                </IndexLink>
              </li>
              <li>
                <Link
                  to="requests" className={isActive ? '' : 'active'}
                  onClick={() => this.toggleCollapse()}
                >Requests
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
Nav.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
