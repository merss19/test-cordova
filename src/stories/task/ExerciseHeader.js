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
  <div/>
);

Header.propTypes = {
  children: React.PropTypes.string.isRequired,
};

export default Header;
