import React from 'react';
import { Meteor } from 'meteor/meteor'
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import Notes from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';

export const NoteList = props => {
  return (
    <div>
      <p>{props.notes.length} notes stored</p>
      <NoteListHeader/>
      {props.notes.map(note => <NoteListItem note={note} key={note._id}/>)}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
}

export default NoteListContainer = withTracker(props => {
  Meteor.subscribe('notes');

  return {
    notes: Notes.find().fetch(),
  }
})(NoteList);
