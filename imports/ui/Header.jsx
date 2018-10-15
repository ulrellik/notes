import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { withRouter } from 'react-router-dom';

export const Header = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <img
          className="header__nav-toggle"
          src={props.isNavOpen ? "/images/x.svg" : "/images/bars.svg"}
          onClick={props.handleToggle}
        />
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={props.handleLogout}>Logout</button>
      </div>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  isNavOpen: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

export default HeaderContainer = withRouter(withTracker(props => {
  return {
    handleLogout: () => Meteor.logout(() => props.history.push('/')),
    isNavOpen: Session.get('isNavOpen'),
    handleToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
  };
})(Header));
