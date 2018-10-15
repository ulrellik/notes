import React from 'react';
import { Meteor } from 'meteor/meteor'
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

export default NoteListHeader = props => {
  return (
    <div className="item-list__header">
      <button className="button" onClick={event => Meteor.call('notes.insert')}>Add note</button>
    </div>
  );
}
