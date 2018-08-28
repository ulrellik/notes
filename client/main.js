import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import createHistory from "history/createBrowserHistory"

import routes, { onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-config';

const history = createHistory();

Tracker.autorun(() => {
  onAuthChange();
});

Tracker.autorun(() => {
  const id = Session.get('selectedNoteId');
  if (id) {
    history.push(`/dashboard/${id}`);
  }
});

Meteor.startup(() => {
  Session.setDefault('selectedNoteId', undefined);
  Tracker.autorun(() => {
    ReactDOM.render(routes, document.getElementById('app'));
  });
});
