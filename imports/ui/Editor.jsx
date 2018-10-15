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
    history: PropTypes.object,
  }

  state = {
    title: '',
    body: '',
  }

  componentDidUpdate(prevProps, prevState) {
    const prevId = prevProps.note ? prevProps.note._id : undefined;
    const currId = this.props.note ? this.props.note._id : undefined;
    if (currId && currId !== prevId) {
      this.setState({ title: this.props.note.title, body: this.props.note.body });
    }
  }

  render() {
    if (!this.props.note) {
      return <div className="editor"><p>Pick a note</p></div>;
    } else {
      return (
        <div className="editor">
          <input
            className="editor__title"
            value={ this.state.title }
            placeholder="title of note"
            onChange={event => {
              this.setState({ title: event.target.value });
              Meteor.call('notes.update', this.props.note._id, { title: event.target.value });
            }}
          />
          <textarea
            className="editor__body"
            value={ this.state.body }
            placeholder="Body of note"
            onChange={event => {
              this.setState({ body: event.target.value });
              Meteor.call('notes.update', this.props.note._id, { body: event.target.value })
            }}
          >
          </textarea>
          <div>
            <button className="button button--pill" onClick={() => {
              Meteor.call('notes.remove', this.props.note._id);
              this.props.history.push('/dashboard/');
            }}>Delete</button>
          </div>
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
