import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { DrumMachine, Display, Pad } from '../App';

describe('DrumMachine', () => {
  const wrapper = mount(<DrumMachine />);
  window.HTMLMediaElement.prototype.play = () => {};

  it('renders a div with id="drum-machine"', () => {
    const div = wrapper.find('#drum-machine');
    expect(div.length).toEqual(1);
  });

  it('passes a key to Pad as inner text', () => {
    const components = wrapper.find(Pad);
    const keys = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];
    expect(components.at(0).contains(keys[0])).toEqual(true);
    expect(components.at(1).contains(keys[1])).toEqual(true);
    expect(components.at(2).contains(keys[2])).toEqual(true);
    expect(components.at(3).contains(keys[3])).toEqual(true);
    expect(components.at(4).contains(keys[4])).toEqual(true);
    expect(components.at(5).contains(keys[5])).toEqual(true);
    expect(components.at(6).contains(keys[6])).toEqual(true);
    expect(components.at(7).contains(keys[7])).toEqual(true);
    expect(components.at(8).contains(keys[8])).toEqual(true);
  });

  describe('Trigger audio', () => {
    const pad = wrapper.find('.drum-pad').at(0);
    const audio = pad.find('audio').instance();

    beforeEach(() => {
      sinon.spy(audio, 'play');
    });

    afterEach(() => {
      audio.play.restore();
    });

    it('when click on a .drum-pad element', () => {
      pad.simulate('click');
      expect(audio.play.calledOnce).toEqual(true);
    });

    it('when press the trigger key associated with .drum-pad', () => {
      const event = {
        key: 'Q',
        preventDefault: () => {},
      };
      wrapper.instance().onKeyDown(event);
      expect(audio.play.calledOnce).toEqual(true);
    });
  });

  describe('inside "#drum-machine"', () => {
    const drumMachine = wrapper.children();

    it('renders the Display component', () => {
      const component = drumMachine.find(Display);
      expect(component.exists()).toEqual(true);
    });

    it('renders at least nine Pad components', () => {
      const components = drumMachine.find(Pad);
      expect(components.length).toBeGreaterThanOrEqual(9);
    });
  });
});
