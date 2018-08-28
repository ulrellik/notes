import { Meteor } from 'meteor/meteor';

import '../imports/startup/simple-schema-config';

import '../imports/api/user';
import '../imports/api/notes';

Meteor.startup(() => {
  // code to run on server at startup
});
