import expect from 'expect';
import { Meteor } from 'meteor/meteor';

import Notes from './notes';

if (Meteor.isServer) {
  describe('notes', function() {

    const note1 = {
      _id: 'testNodeId1',
      userId: '12345678',
      title: 'Test note1',
      body: 'This is only a test',
      updatedAt: 0,
    };

    const note2 = {
      _id: 'testNodeId2',
      userId: '87654321',
      title: 'Test note2',
      body: 'This is only a test',
      updatedAt: 0,
    };

    beforeEach(function() {
      Notes.remove({});
      Notes.insert(note1);
      Notes.insert(note2);
    });

    it('should insert new note', function() {
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId: note1.userId });

      expect(Notes.findOne({ _id, userId: note1.userId })).toBeDefined();
    });

    it('should not insert new note if unauthenticated', function() {
      expect(() => Meteor.server.method_handlers['notes.insert'].apply({})).toThrow();
    });

    it('should remove a note', function() {
      const _id = Meteor.server.method_handlers['notes.remove'].apply({ userId: note1.userId }, [note1._id]);

      expect(Notes.findOne({ _id: note1._id, userId: note1.userId })).toBeUndefined();
    });

    it('should not remove a note if unauthenticated', function() {
      expect(() => Meteor.server.method_handlers['notes.remove'].apply({}, [note1._id])).toThrow();
    });

    it('should not remove a note if unauthenticated', function() {
      expect(() => Meteor.server.method_handlers['notes.remove'].apply({ userId: note1.userId }, [''])).toThrow();
    });

    it('should update a note', function() {
      const _id = Meteor.server.method_handlers['notes.update'].apply({ userId: note1.userId }, [note1._id, { title: 'changed' }]);

      const note = Notes.findOne({ _id: note1._id, userId: note1.userId });
      expect(note.updatedAt).toBeGreaterThan(note1.updatedAt);
      expect(note).toHaveProperty('title', 'changed');
      expect(note).toHaveProperty('body', note1.body);
    });

    it('should not update a note if unauthenticated', function() {
      expect(() => Meteor.server.method_handlers['notes.update'].apply({}, [note1._id, { title: 'changed' }])).toThrow();
    });

    it('should not update a note if contains extra fields', function() {
      expect(() => Meteor.server.method_handlers['notes.update'].apply({ userId: note1.userId }, [note1._id, { title: 'changed', extra: 'should not be there' }])).toThrow();
    });

    it('should return user\'s notes', function() {
      const notes = Meteor.server.publish_handlers['notes'].apply({ userId: note1.userId }).fetch();
      expect(notes).toEqual([note1]);
    });

  });
}
