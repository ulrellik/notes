import expect from 'expect';
import { Meteor } from 'meteor/meteor';

import { validateNewUser } from './user.js';

if (Meteor.isServer) {
  describe('users', function() {
    it('should accept valid emails', function() {
      expect(validateNewUser({ emails: [{ address: 'test@test.com' }] })).toBe(true);
    });

    it('should refuse invalid emails', function() {
      expect(() => validateNewUser({ emails: [{ address: 'testtest.com' }] })).toThrow();
    });
  });
}
