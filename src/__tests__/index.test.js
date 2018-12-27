import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { MyTodoApp } from '../app.js';
import { LocalStorage } from './test.localStorage.js';

describe('<MyTodoApp /> Component', () => {
  it('Renders a <div />', () => {
    const wrapper = shallow(<MyTodoApp />);
    expect(wrapper.exists()).toBe(true);
  });
  test('handleInput updates state.input and the input\'s value', () => {
    const wrapper = shallow(<MyTodoApp />);
    wrapper.find('#mainInput').simulate('change', {'target':{'value':'buy milk'}});
    expect(wrapper.state('input')).toBe('buy milk');
    expect(wrapper.find('#mainInput').length).toBe(1);
    wrapper.find('#mainInput').simulate('change', {'target':{'value':'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'}});
    expect(wrapper.find('#mainInput').length).toBe(1);
  });
  test('handleSubmit updates state.items', () => {
    /* Invalid input test */
    const wrapper = shallow(<MyTodoApp />);
    wrapper.find('#mainInput').simulate('change', {'target':{'value':'   '}});
    wrapper.find('#addButton').simulate('click');
    expect(wrapper.state('items')[0]).toBe(undefined);
    /* Updates state.items */
    wrapper.find('#mainInput').simulate('change', {'target':{'value':'buy cheese'}});
    wrapper.find('#addButton').simulate('click');
    wrapper.find('#mainInput').simulate('change', {'target':{'value':'buy milk'}});
    wrapper.find('#addButton').simulate('click');
    expect(wrapper.state('items')[1]).toBe('buy milk');
    /* To make sure duplicate items are not entered onto the list */
    wrapper.find('#mainInput').simulate('change', {'target':{'value':'buy milk'}});
    wrapper.find('#addButton').simulate('click');
    expect(wrapper.state('items')[2]).toBe(undefined);
  });
  test('todo-list length cannot exceed 9 items test', () => {
    const wrapper = shallow(<MyTodoApp />);
    const testData = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    const helperFunc = (() => {
      for (let i = 0; i < testData.length; i++) {
        wrapper.find('#mainInput').simulate('change', {'target':{'value': testData[i]}});
        wrapper.find('#addButton').simulate('click');
      }
    })(); 
    wrapper.find('#mainInput').simulate('change', {'target':{'value': 'k'}});
    wrapper.find('#addButton').simulate('click');
    expect(wrapper.state('items')[8]).toBe('i');
    expect(wrapper.state('items')[9]).toBe(undefined);
  }); 
  test('Delete button removes an item from state.items', () => {
    const wrapper = mount(<MyTodoApp />);
    wrapper.find('#mainInput').simulate('change', {'target':{'value': 'do homework'}});
    wrapper.find('#addButton').simulate('click');
    expect(wrapper.state('items')[0]).toBe('do homework');
    wrapper.find('.deleteButtons').simulate('click');
    expect(wrapper.state('items')[0]).toBe(undefined);
  });
  test('updateForm renders', () => {
    const wrapper = mount(<MyTodoApp />);
    wrapper.find('#mainInput').simulate('change', {'target':{'value': 'do homework'}});
    wrapper.find('#addButton').simulate('click');
    wrapper.find('.editButtons').simulate('click');
    expect(wrapper.find('#updateForm').exists()).toBe(true);
  });
  test('editItem changes state', () => {
    const wrapper = mount(<MyTodoApp />);
    wrapper.find('#mainInput').simulate('change', {'target':{'value': 'do homework'}});
    wrapper.find('#addButton').simulate('click');
    wrapper.find('.editButtons').simulate('click');
    expect(wrapper.state('edit')).toBe(true);
    expect(wrapper.state('originalLi')).toBe('do homework');
  });
  test('closeEdit changes state & removes updateForm', () => {
    const wrapper = mount(<MyTodoApp />);
    wrapper.find('#mainInput').simulate('change', {'target':{'value': 'do homework'}});
    wrapper.find('#addButton').simulate('click');
    wrapper.find('.editButtons').simulate('click');
    expect(wrapper.state('edit')).toBe(true);
    wrapper.find('#closeButton').simulate('click');
    expect(wrapper.state('edit')).toBe(false);
    expect(wrapper.find('#updateForm').exists()).toBe(false);
  });
  test('updateItem updates state', () => {
    const wrapper = mount(<MyTodoApp />);
    wrapper.find('#mainInput').simulate('change', {'target':{'value': 'do homework'}});
    wrapper.find('#addButton').simulate('click');
    wrapper.find('.editButtons').simulate('click');
    wrapper.find('#updateInput').simulate('change', {'target':{'value': 'do homework @ 7:30'}});
    wrapper.find('#updateButton').simulate('click');
    expect(wrapper.state('items')[0]).toBe('do homework @ 7:30');
    expect(wrapper.state('edit')).toBe(false);
    expect(wrapper.state('originalLi')).toBe('');
  });
});
