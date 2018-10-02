import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import routes, { history } from '../imports/routes/routes';
import '../imports/startup/simple-schema-config';

Tracker.autorun(() => {
  const id = Session.get('selectedNoteId');
  if (id) {
    history.push(`/dashboard/${id}`);
  }
});

Meteor.startup(() => {
  Session.setDefault('selectedNoteId', undefined);
  ReactDOM.render(routes, document.getElementById('app'));
});
