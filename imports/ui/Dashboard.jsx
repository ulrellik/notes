import React from 'react';
import { Meteor } from 'meteor/meteor';

import Header from './Header';
import Editor from './Editor';
import NoteList from './NoteList';

export default () => {
    return <div>
      <div>
        <Header title="Notes"/>
        <div className="page-content">
          <NoteList/>
          <Editor />
        </div>
      </div>
    </div>
};
