import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';

import Messages from '../notifications/Messages';
import Errors from '../notifications/Errors';

import {widgetCreate} from "./actions";

// validation function for 'name' field
const nameRequired = value => (value ? undefined : 'Name Required')

class Widgets extends Component {

  renderNameInput = ({ input, type, meta: { touched, error } }) => (
    <div>
      {/* Spread RF's input properties onto our input */}
      <input
        {...input}
        type={type}
      />
      {/*
        If the form has been touched AND is in error, show `error`.
        `error` is the message returned from our validate function above
        which in this case is `Name Required`.

        `touched` is a live updating property that RF passes in.  It tracks
        whether or not a field has been "touched" by a user.  This means
        focused at least once.
      */}
      {touched && error && (
        <div style={{ color: '#cc7a6f', margin: '-10px 0 15px', fontSize: '0.7rem' }}>
          {error}
        </div>
      )
      }
    </div>
  );

  submit = (widget) => {
    const {client, widgetCreate, reset} = this.props;
    widgetCreate(widget, client);
    reset();
  };

  render() {
    const {
      handleSubmit,
      invalid,
      widgets: {
        list,
        requesting,
        successful,
        messages,
        errors
      }
    } = this.props;
    return (
      <div className="widgets">
        <div className="widget-form">
          <form onSubmit={handleSubmit(this.submit)}>
            <h1>CREATE THE WIDGET</h1>
            <label htmlFor="name">Name</label>
            {/* We will use a custom component AND a validator */}
            <Field
              name="name"
              type="text"
              id="name"
              className="name"
              component={this.renderNameInput}
              validate={nameRequired}
            />
            <label htmlFor="description">Description</label>
            <Field
              name="description"
              type="text"
              id="description"
              className="description"
              component="input"
            />
            <label htmlFor="size">Size</label>
            <Field
              name="size"
              type="number"
              id="size"
              className="number"
              component="input"
            />
            {/* the button will remain disabled until not invalid */}
            <button
              disabled={invalid}
              action="submit"
            >CREATE</button>
          </form>
          <hr />
          <div className="widget-messages">
            {requesting && <span>Creating widget...</span>}
            {!requesting && !!errors.length && (
              <Errors message="Failure to create Widget due to:" errors={errors} />
            )}
            {!requesting && successful && !!messages.length && (
              <Messages messages={messages} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  client: state.client,
  widgets: state.widgets
});

const connected = connect(mapStateToProps, {widgetCreate})(Widgets);

const formed = reduxForm({
  form: 'widgets',
})(connected);

export default formed;
