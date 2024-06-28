import React from 'react';
import PropTypes from 'prop-types';

export function MemoryBowArrow(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 22 22" {...props}>
      <path fill="white" d="M1 3h10v1h2v1h3V4h1V2h3v3h-2v1h-1v3h1v2h1v10h-2v-2h-2v-1h-1v-1h-1v-1h-1v-1H9v1H8v1H7v3H6v1H5v1H4v-1H3v-1H2v-1H1v-1h1v-1h1v-1h3v-1h1v-1h1v-2H7v-1H6V9H5V8H4V7H3V5H1zm15 15h1v-6h-1v-2h-1V9h-1v1h-1v1h-1v1h-1v1h1v1h1v1h1v1h1v1h1zM12 7V6h-2V5H4v1h1v1h1v1h1v1h1v1h1v1h1v-1h1V9h1V8h1V7z"></path>
    </svg>
  );
}

MemoryBowArrow.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
};
