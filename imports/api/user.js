import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';

const userSchema = new SimpleSchema({
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  }, 
});

export function validateNewUser(user) {
  userSchema.validate({email: user.emails[0].address});
  return true;
}

if (Meteor.isServer)
  Accounts.validateNewUser(validateNewUser);
