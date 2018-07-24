import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

const Notes = new Mongo.Collection('notes');

if (Meteor.isServer) {
  Meteor.publish('notes', function() {
    return Notes.find({ userId: this.userId });
  });
}

Meteor.methods({
  'notes.insert'() {
    if (!this.userId) throw new Meteor.Error('401');

    return Notes.insert({
      title: '',
      body: '',
      userId: this.userId,
      updatedAt: moment().valueOf(),
    });
  },

  'notes.remove'(_id) {
    if (!this.userId) throw new Meteor.Error('401');

    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
    }).validate({ _id });

    return Notes.remove({
      _id,
      userId: this.userId,
    });
  },

  'notes.update'(_id, updates) {
    if (!this.userId) throw new Meteor.Error('401');

    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
      title: {
        type: String,
        min: 1,
        optional: true,
      },
      body: {
        type: String,
        min: 1,
        optional: true,
      },
    }).validate({ _id, ...updates });

    return Notes.update({ _id, userId: this.userId }, { $set: { updatedAt: moment().valueOf(), ...updates } });
  },
});

export default Notes;
