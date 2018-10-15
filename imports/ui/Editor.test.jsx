import Enzyme, { shallow } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import ReactTestUtils from 'react-dom/test-utils';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { Meteor } from 'meteor/meteor';

import { Editor } from './Editor';
import { notes } from '../fixtures/fixtures';

Enzyme.configure({ adapter: new Adapter() });
chai.use(spies);

if (Meteor.isClient) {
  describe('Editor', function() {
    afterEach(() => {
      chai.spy.restore();
    });

    it('should remove note', function() {
      const spyCall = chai.spy();
      chai.spy.on(Meteor, 'call', spyCall);
      const spyPush = chai.spy();
      const wrapper = shallow(<Editor selectedNoteId={notes[1]._id} note={notes[1]} history={{ push: spyPush }}/>);

      wrapper.find('button').simulate('click');
      expect(spyCall).to.have.been.called.with.exactly('notes.remove', notes[1]._id);
      expect(spyPush).to.have.been.called.with.exactly('/dashboard/');
    });

    it('should update body on typing', function() {
      const spyCall = chai.spy();
      chai.spy.on(Meteor, 'call', spyCall);
      const wrapper = shallow(<Editor selectedNoteId={notes[1]._id} note={notes[1]}/>);

      wrapper.find('textarea').simulate('change', { target: { value: 'Test' } });
      expect(wrapper.state('body')).to.equal('Test');
      expect(spyCall).to.have.been.called.with.exactly('notes.update', notes[1]._id, { body: 'Test' });
    });

    it('should update on different note', function() {
      const wrapper = shallow(<Editor />);

      wrapper.setProps({ selectedNoteId: notes[1]._id, note: notes[1] });

      expect(wrapper.find('input').prop('value')).to.equal(notes[1].title);
      expect(wrapper.find('textarea').prop('value')).to.equal(notes[1].body);
    });
  });
}
