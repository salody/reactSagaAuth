import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

// Import the helpers...
import Messages from '../notifications/Messages';
import Errors from '../notifications/Errors';

import {signupRequest} from './actions'

class Signup extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    signupRequest: PropTypes.func,
    signup: PropTypes.shape({
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
    this.props.signupRequest(values)
  };

  render() {
    const {
      handleSubmit,
      signup: {
        requesting,
        successful,
        messages,
        errors
      }
    } = this.props;

    return (
      <div className="signup">
        <form className="widget-form" onSubmit={handleSubmit(this.submit)}>
          <h1>Signup</h1>
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
          <button action="submit">SIGNUP</button>
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
            <Errors message="Failure to signup due to:" errors={errors} />
          )}
          {!requesting && !!messages.length && (
            <Messages messages={messages} />
          )}
          {!requesting && successful && (
            <div>
              Signup Successful! <p onClick={() => browserHistory.push('/login')}>Click here to Login »</p>
            </div>
          )}
          {/* Redux Router's <Link> component for quick navigation of routes */}
          {!requesting && !successful && (
            <p onClick={() => browserHistory.push('/login')}>Already a Widgeter? Login Here »</p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  signup: state.signup
});

const connected = connect(mapStateToProps, {signupRequest})(Signup);

// Connect our connected component to Redux Form.  It will namespace
// the form we use in this component as `signup`.
const formed = reduxForm({
  form: 'signup'
})(connected);

export default formed;