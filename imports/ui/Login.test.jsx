import Enzyme, { mount, shallow } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import ReactTestUtils from 'react-dom/test-utils';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { Meteor } from 'meteor/meteor';
import { MemoryRouter } from 'react-router'

import { Login } from './Login';

Enzyme.configure({ adapter: new Adapter() });
chai.use(spies);

if (Meteor.isClient) {
  describe('Login', function() {
    it('should show error message', function() {
      const wrapper = shallow( <Login loginWithPassword={() => {}}/> );
      wrapper.setState({ error: 'test' });
      expect(wrapper.find('p').text()).to.equal('test');

      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).to.equal(0);
    });

    it('should login with form data', function() {
      const spy = chai.spy();
      const wrapper = mount( <MemoryRouter initialEntries={['/']} initialIndex={0}><Login loginWithPassword={spy}/></MemoryRouter> );
      wrapper.find('[name="email"]').instance().value = 'test@test.com';
      wrapper.find('[name="password"]').instance().value = '12345678';
      wrapper.find('form').simulate('submit');

      expect(spy).to.have.been.called.with({email: 'test@test.com'}, '12345678');
    });

    it('should show error on login failure', function() {
      const spy = chai.spy((obj1, obj2, callback) => callback({message: 'test'}));
      const wrapper = mount( <MemoryRouter initialEntries={['/']} initialIndex={0}><Login loginWithPassword={spy}/></MemoryRouter> );
      wrapper.find('form').simulate('submit');

      expect(wrapper.find(Login).instance().state.error).to.equal('test');
    });
  });
}
