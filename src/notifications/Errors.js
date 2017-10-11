import React from 'react';
import PropTypes from 'prop-types';

const Errors = (props) => {
  const { message, errors} = props;
  return (
    <div>
      <h3>{message}</h3>
      <ul>
        {errors.map(error => (
          <li key={error.time}>{error.body}</li>
        ))}
      </ul>
    </div>
  );
};

Errors.propTypes = {
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string,
      time: PropTypes.instanceOf(Date)
    })
  )
};

export default Errors;