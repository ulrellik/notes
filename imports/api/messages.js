import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'
import SimpleSchema from 'simpl-schema';

const Messages = new Mongo.Collection('Messages');
Messages.schema = new SimpleSchema({
  chatRoomId: {
    type: String,
    label: 'Chat room Id',
  },
  messageDate: {
    type: Date,
    label: 'Message sent at',
    autoValue() {
      return new Date();
    },
  },
  messageSender: {
    type: String,
    label: 'Sender Id',
  },
  messageBody: {
    type: String,
    optional: true,
    label: 'Message body',
  },
  messageMetaData: {
    type: Object,
    label: 'Message meta data',
  },
  'messageMetaData.type': {
    type: String,
    label: 'Message type',
  },
  'messageMetaData.title': {
    type: String,
    optional: true,
    label: 'Message title',
  },
  'messageMetaData.url': {
    optional: true,
    type: String,
    label: 'Message url',
  },
  'messageMetaData.instruction': {
    optional: true,
    type: String,
    label: 'Message Instruction',
  },
  seen: {
    type: Array,
    label: 'Mesage seen by',
  },
  'seen.$': {
    type: String,
    label: 'Message seen.',
    optional: true,
  },
});

export default Messages;

if (Meteor.isServer) {
  Meteor.publish('messages.new', function() {
    return Messages.find({ });
  });
}

Meteor.methods({
  'messages.insert'(message) {
    Messages.insert({messageBody: message});
  }
});
