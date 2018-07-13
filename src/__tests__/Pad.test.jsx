import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-react-adapter-future';
import { DrumMachine, Display, Pad } from '../App';

configure({ adapter: new Adapter() });

describe('Pad', () => {
  const wrapper = shallow(<Pad src="file.mp3" />);

  it('renders an element with class="drum-pad"', () => {
    const elem = wrapper.find('.drum-pad');
    expect(elem.length).toEqual(1);
  });

  it('renders an audio element', () => {
    const elem = wrapper.find('audio');
    expect(elem.length).toEqual(1);
  });

  describe('An audio element', () => {
    const elem = wrapper.find('audio');

    it('has a class name of clip', () => {
      expect(elem.hasClass('clip')).toEqual(true);
    });

    it('contains src attribute', () => {
      expect(elem.prop('src')).toEqual('file.mp3');
    });
  });
});
