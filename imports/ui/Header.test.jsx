import Enzyme, { mount } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import ReactTestUtils from 'react-dom/test-utils';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { Meteor } from 'meteor/meteor';

import { Header } from './Header';

Enzyme.configure({ adapter: new Adapter() });
chai.use(spies);

if (Meteor.isClient) {
  describe('Header', function() {
    it('should set button text to logout', function() {
      const wrapper = mount( <Header title="test"/> );
      expect(wrapper.find('button').text()).to.equal('Logout');
    });

    it('should set title', function() {
      const wrapper = mount( <Header title="test"/>) ;
      expect(wrapper.find('h1').text()).to.equal('test');
    });

    it('should logout on click', function() {
      const spy = chai.spy();
      const wrapper = mount( <Header title="test" handleLogout={spy}/> );
      wrapper.find('button').simulate('click');
      expect(spy).to.have.been.called();
    });
  });
}
