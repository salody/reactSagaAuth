import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

// Import the helpers...
import Messages from '../notifications/Messages';
import Errors from '../notifications/Errors';

import { loginRequest } from './actions'

class Login extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    loginRequest: PropTypes.func,
    login: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array
    })
  };

  // Redux Form will call this function with the values of our
  // Form fields "email" and "password" when the form is submitted
  // this will in turn call the action
  submit = (values) => {
    this.props.loginRequest(values)
  };

  render() {
    const {
      handleSubmit,
      login: {
        requesting,
        successful,
        messages,
        errors
      }
    } = this.props;

    return (
      <div className="signup">
        <form className="widget-form" onSubmit={handleSubmit(this.submit)}>
          <h1>Login</h1>
          <label htmlFor="email">Email</label>
          <Field
            name="email"
            type="text"
            id="email"
            className="email"
            label="Email"
            component="input"
          />
          <label htmlFor="password">Password</label>
          <Field
            name="password"
            type="password"
            id="password"
            className="password"
            label="Password"
            component="input"
          />
          <button className="signup-submit" action="submit">LOGIN</button>
        </form>
        <div className="auth_messages">
          {
            /*
            These are all nothing more than helpers that will show up
            based on the UI states, not worth covering in depth.  Simply put
            if there are messages or errors, we show them
            */
          }
          {!requesting && !!errors.length && (
            <Errors message="Failure to login due to:" errors={errors} />
          )}
          {!requesting && !!messages.length && (
            <Messages messages={messages} />
          )}
          {requesting && <div>Logging in...</div>}
          {/* Redux Router's <Link> component for quick navigation of routes */}
          {!requesting && !successful && (
            <Link to="/signup">Need to Signup? Click here »</Link>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login
});

const connected = connect(mapStateToProps, {loginRequest})(Login);

// Connect our connected component to Redux Form.  It will namespace
// the form we use in this component as `signup`.
const formed = reduxForm({
  form: 'login'
})(connected);

export default formed;