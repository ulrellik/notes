import React from 'react';
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';

export default NoteListItem = props => {
  return (
    <div className={ props.note.selected ? 'selected' : undefined } onClick={() => Session.set('selectedNoteId', props.note._id)}>
      <h5>{ props.note.title || 'Untitled' }</h5>
      <p>{ moment(props.note.updatedAt).format('DD/MM/YYYY') }</p>
    </div>
  );
}

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired,
}
