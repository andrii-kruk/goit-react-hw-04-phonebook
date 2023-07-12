import React from 'react';
import PropTypes from 'prop-types';

import css from './Filter.module.css';
const { filter_input } = css;

export const Filter = ({ onChange, value }) => {
  return (
    <input
      type="text"
      id="filter"
      name="filter"
      className={filter_input}
      placeholder="Search contacts..."
      onChange={onChange}
      value={value}
    />
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
