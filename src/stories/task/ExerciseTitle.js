import React from 'react';

const exerciseNumberStyles = {
  border: '13px solid #70CFFE',
  borderRadius: 45,
  backgroundColor: '#70CFFE',
  color: '#FFFFFF',
  fontFamily: 'Helvetica',
  fontSize: 23,
  padding: '0px 20px 0px 6px',
  margin: '0px 20px',
  width: 12,
};

const exerciseNumberCompleteStyles = {
  border: '13px solid #56DAA1',
  borderRadius: 45,
  backgroundColor: '#56DAA1',
  color: '#FFFFFF',
  fontFamily: 'Helvetica',
  fontSize: 23,
  padding: '0px 20px 0px 6px',
  margin: 10,
  width: 12,
};

const exerciseTitleStyles = {
  borderRadius: 5,
  color: '#1F447B',
  fontFamily: 'Helvetica',
  fontSize: 20,
  padding: '15px 10px',
  margin: '-54px 75px',
};

const ExerciseTitle = ({ children, number, complete }) => {
  if (complete) {
    return (
      <div>
        <div style={exerciseNumberCompleteStyles}>
          {number}
        </div>
        <div style={exerciseTitleStyles}>
          {children}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div style={exerciseNumberStyles}>
          {number}
        </div>
        <div style={exerciseTitleStyles}>
          {children}
        </div>
      </div>
    );
  }
}

ExerciseTitle.propTypes = {
  children: React.PropTypes.string.isRequired,
};

export default ExerciseTitle;
