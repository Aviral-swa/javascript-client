import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from './Button';

Enzyme.configure({ adapter: new Adapter() });

describe('button', () => {
  const resetState = () => {};
  const wrapper = shallow(
    <Button value="cancel" onClick={resetState} disabled>
      cancel
    </Button>,
  );
  it('renders a button', () => {
    expect(wrapper.find('Button')).toHaveLength(1);
  });
  it('should be disabled', () => {
    expect(wrapper.props().disabled).toEqual(true);
  });
});
