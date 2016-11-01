import React from 'react';

const headerStyles = {
  height: 40,
  backgroundColor: '#56D0FC',
};

const Header = ({ children }) => (
  <div style={headerStyles}>
    <div  className='row'>
      <div className='two columns'>
        <img src='/Users/vao/Desktop/logo.png'/>
      </div>
      <div className='eight columns'>
      </div>
      <div className='two columns'>
        <img src='/Users/vao/Desktop/alpha_logo.png'/>
      </div>
    </div>
  </div>
)

Header.propTypes = {
  children: React.PropTypes.string.isRequired,
};

export default Header;
