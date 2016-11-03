import React from 'react';

const buttonStyles = {
  border: '0px solid #FFFFFF',
  backgroundColor: '#FFFFFF',
  color: '#FFFFFF',
  cursor: 'pointer',
  fontSize: 10,
  boxShadow: '0 0 10px rgba(0,0,0,0.2)',
  margin: 10,
  width: 70,
  height: 50,
};

const dayNameStyles = {
  color: '#C8C9CF',
  fontSize: 14,
  fontFamily: 'Helvetica',
  margin: '0px 2px 15px',
  width: 10,
};

const dayNumberStyles = {
  color: '#1F447B',
  fontSize: 16,
  fontFamily: 'Helvetica',
  margin: '0px 5px',
  width: 10,
};

const indicatorStyles = {
  border: '10px solid #FFFFFF',
  borderRadius: 20,
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
  margin: '0px 0px -35px 0px',
  width: 1,
  height: 1,
};

const indicatorCompleteStyles = {
  border: '10px solid #56DAA1',
  borderRadius: 20,
  backgroundColor: '#56DAA1',
  cursor: 'pointer',
  margin: '0px 0px -35px 0px',
  width: 1,
  height: 1,
};

const indicatorFailedStyles = {
  border: '10px solid #FF7C7C',
  borderRadius: 20,
  backgroundColor: '#FF7C7C',
  cursor: 'pointer',
  margin: '0px 0px -35px 0px',
  width: 1,
  height: 1,
};

const indicatorCell = {
  padding: '0px 10px 0px 30px'
}

const dayXStyles = {};

const CalendarFinal = ({ children, onClick, number, complete }) => {
  if (complete === 'complete') {
    return (
      <table style={buttonStyles} onClick={onClick}>
        <tr>
          <th><div style={dayNameStyles}>{children}</div></th>
          <th style={indicatorCell}><div style={indicatorCompleteStyles}/></th>
        </tr>
        <tr>
          <td><div style={dayNumberStyles}>{number}</div></td>
        </tr>
      </table>
    );
  } else if (complete === 'failed') {
    return (
      <table style={buttonStyles} onClick={onClick}>
        <tr>
          <th><div style={dayNameStyles}>{children}</div></th>
          <th style={indicatorCell}><div style={indicatorFailedStyles}/></th>
        </tr>
        <tr>
          <td><div style={dayNumberStyles}>{number}</div></td>
        </tr>
      </table>
    );
  } else {
    return (
      <table style={buttonStyles} onClick={onClick}>
        <tr>
          <th><div style={dayNameStyles}>{children}</div></th>
          <th style={indicatorCell}><div style={indicatorStyles}/></th>
        </tr>
        <tr>
          <td><div style={dayNumberStyles}>{number}</div></td>
        </tr>
      </table>
    );
  }
};

CalendarFinal.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default CalendarFinal;
