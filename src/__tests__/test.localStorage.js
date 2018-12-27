import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { MyTodoApp } from '../app.js';

class LocalStorage {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = value.toString();
  }
  removeItem(key) {
    delete this.store[key];
   }
};
window.localStorage = new LocalStorage; 

describe('MyTodoApp', () => {
  test('localStorage updates in the handleSubmit functions', () => {
    const wrapper = mount(<MyTodoApp />);
    // handleSubmit function
    wrapper.find('#mainInput').simulate('change', {'target':{'value': 'get milk'}});
    wrapper.find('#addButton').simulate('click');
    expect(JSON.parse(window.localStorage.store.lsArray)[0]).toBe('get milk');
    //updateItem function
    wrapper.find('.editButtons').simulate('click');
    wrapper.find('#updateInput').simulate('change', {'target':{'value': 'get milk, tomorrow morning'}});
    wrapper.find('#updateButton').simulate('click');
    expect(JSON.parse(window.localStorage.store.lsArray)[0]).toBe('get milk, tomorrow morning');
    // removeItem function
    wrapper.find('.deleteButtons').simulate('click');
    expect(JSON.parse(window.localStorage.store.lsArray)[0]).toBe(undefined);
  });
});
