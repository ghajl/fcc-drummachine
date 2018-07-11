import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-react-adapter-future';
import { DrumMachine } from '../App';
configure({ adapter: new Adapter() });
// Enzyme.configure({ adapter: new Adapter() });


describe('DrumMachine', () => {
  let mountedDrumMachine;
  const drumMachine = () => {
    if (!mountedDrumMachine) {
      mountedDrumMachine = mount(<DrumMachine />);
    }
    return mountedDrumMachine;
  };

  it('always renders a div', () => {
    const divs = drumMachine().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });
});
