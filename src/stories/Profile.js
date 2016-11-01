import React from 'react';

const profileLinkStyles = {};
const profileName = {};
const profileText = {};

const Profile = ({ children, href }) => (
  <a
    style={profileLinkStyles}
    href={href}
  >
    <div style={profileName}>{children}</div>
    <div style={profileText}>Профиль</div>
  </a>
);

Profile.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default Profile;
