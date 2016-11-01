import React from 'react';

const textStyles = {
  borderRadius: 5,
  color: '#1F447B',
  fontFamily: 'Helvetica',
  fontSize: 14,
  padding: '3px 10px',
  margin: '5px 10px',
};

const TextDarkBlue = ({ children, center }) => {
  if (center) {
    textStyles.textAlign = 'center';
  } else {
    textStyles.textAlign = 'left';
  }

  return (
    <div style={textStyles}>
      {children}
    </div>
  )
};

TextDarkBlue.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default TextDarkBlue;
