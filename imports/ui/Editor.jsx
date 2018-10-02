import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Notes from '../api/notes';

export class Editor extends React.Component {
  static propTypes = {
    selectedNoteId: PropTypes.string,
    note: PropTypes.object,
  }

  componentDidMount() {
    if (this.props.match) {
      Session.set('selectedNoteId', this.props.match.params.id)
    }
  }

  render() {
    if (!this.props.note) {
      return <p>Pick a note</p>;
    } else {
      return (
        <div>
          <input
            value={ this.props.note.title }
            placeholder="title of note"
            onChange={event => Meteor.call('notes.update', this.props.note._id, { title: event.target.value })}
          />
          <textarea
            value={ this.props.note.body }
            placeholder="Body of note"
            onChange={event => Meteor.call('notes.update', this.props.note._id, { body: event.target.value })}
          >
          </textarea>
          <button onClick={() => alert('deleted')}>Delete</button>
        </div>
      );
    }
  }
}

export default EditorContainer = withRouter(withTracker(props => {
  selectedNoteId = Session.get('selectedNoteId');
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
  }
})(Editor));
