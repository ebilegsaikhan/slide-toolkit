// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
  auth: state.auth,
});

class PrivateRoute extends Component {
  checkUserRole = (ChildComponent, props) => {
    if (this.props.required === "") {
      return <ChildComponent {...props} />;
    }
    if (this.props.auth.modules.indexOf(this.props.required) !== -1) {
      return <ChildComponent {...props} />;
    }

    return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
  }

  render() {
    const { component: ChildComponent, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => (
        this.props.auth.isLogged ? (
          this.checkUserRole(ChildComponent, props)
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location },
          }}
          />
        )
      )}
      />
    );
  }
}

PrivateRoute.defaultProps = {
  required: '',
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    isLogged: PropTypes.bool.isRequired,
    modules: PropTypes.array,
  }).isRequired,
  required: PropTypes.string,
};

export default connect(mapStateToProps)(PrivateRoute);
