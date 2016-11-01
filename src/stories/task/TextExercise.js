import React from 'react';

const numberStyles = {
  display: 'inline',
  color: '#C8C9CF',
  fontSize: 18,
  fontFamily: 'Helvetica',
  margin: '10px 10px'
};

const textStyles = {
  display: 'inline',
  borderRadius: 5,
  color: '#1F447B',
  fontFamily: 'Helvetica',
  fontSize: 14,
  padding: '13px 10px',
};

const TextExercise = ({ children, number }) => (
  <div>
    <div style={numberStyles}>
      {number}
    </div>
    <div style={textStyles}>
      {children}
    </div>
    <br/>
    <br/>
  </div>
);

TextExercise.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default TextExercise;
