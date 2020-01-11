import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Filter({ onSearch }) {
  const [input, setInput] = useState('');

  const handleInput = e => {
    const input = e.target.value;

    setInput(input);
    onSearch(input);
  };

  return (
    <label htmlFor="query">
      <span>Filter contacts by name: </span>
      <input id="query" type="text" onChange={handleInput} value={input} />
    </label>
  );
}

Filter.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
