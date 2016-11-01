import React from 'react';
import ExerciseTitle from './ExerciseTitle';
import TaskButton from '../TaskButton';

const headerStyles = {
  height: 70,
  backgroundColor: '#FCFDFD',
};

const hairLineStyles = {
  height: 1,
  backgroundColor: '#70CFFE',
};

const Header = ({ children, onClick }) => (
  <div className='row' style={headerStyles}>
    <div className='row' style={hairLineStyles}/>
    <div className='six columns'>
      <ExerciseTitle number='1'>{children}</ExerciseTitle>
    </div>
    <div className='three columns'>
    </div>
    <div className='three columns'>
      <TaskButton onClick={onClick}>ВЫПОЛНИТЬ 😀</TaskButton>
    </div>
  </div>
)

Header.propTypes = {
  children: React.PropTypes.string.isRequired,
};

export default Header;
