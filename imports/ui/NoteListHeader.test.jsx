import Enzyme, { mount, shallow } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import sinon from 'sinon';
import { Meteor } from 'meteor/meteor';

import NoteListHeader from './NoteListHeader';

Enzyme.configure({ adapter: new Adapter() });
chai.use(spies);

if (Meteor.isClient) {
  describe('NoteListHeader', function() {
    afterEach(() => {
      sinon.restore();
    });

    it('should call notes.insert (chai)', function() {
      const wrapper = shallow(<NoteListHeader />);
      const spy = chai.spy();
      chai.spy.on(Meteor, 'call', spy);

      wrapper.find('button').simulate('click');
      expect(spy).to.have.been.called.with('notes.insert');
    });

    it('should call notes.insert (sinon)', function() {
      const wrapper = shallow(<NoteListHeader />);
      const fake = sinon.fake();
      sinon.replace(Meteor, 'call', fake);

      wrapper.find('button').simulate('click');
      sinon.assert.calledWith(fake, 'notes.insert');
    });


  });
}
