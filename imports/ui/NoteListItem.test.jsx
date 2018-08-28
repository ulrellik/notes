import Enzyme, { mount, shallow } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import sinon from 'sinon';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import NoteListItem from './NoteListItem';
import { notes } from '../fixtures/fixtures';

Enzyme.configure({ adapter: new Adapter() });
chai.use(spies);

if (Meteor.isClient) {
  describe('NoteListItem', function() {
    afterEach(() => {
      sinon.restore();
    });

    it('should show title date', function(){
      const wrapper = shallow(<NoteListItem note={notes[1]} />);
      expect(wrapper.find('h5').text()).to.equal(notes[1].title);
    });

    it('should show title as untitled if none provided', function(){
      const wrapper = shallow(<NoteListItem note={notes[0]} />);
      expect(wrapper.find('h5').text()).to.equal('Untitled');
      expect(wrapper.find('p').text()).to.equal('28/08/2018');
    });

    it('should update id on click', function(){
      const wrapper = shallow(<NoteListItem note={notes[1]} />);
      const spy = chai.spy();
      chai.spy.on(Session, 'set', spy);
      wrapper.find('div').simulate('click');

      expect(spy).first.called.with('selectedNoteId', notes[1]._id);
    });
  });
}
