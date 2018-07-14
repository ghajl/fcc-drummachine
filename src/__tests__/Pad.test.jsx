import React from 'react';
import { shallow } from 'enzyme';
import { Pad } from '../App';

describe('Pad', () => {
  const key = 'Q';

  const props = {
    id: key,
    src: 'file.mp3',
    onClick: () => {},
  };
  const wrapper = shallow(
    <Pad {...props}>
      {key}
    </Pad>,
  );

  it('renders an element with class="drum-pad"', () => {
    const elem = wrapper.find('.drum-pad');
    expect(elem.length).toEqual(1);
  });

  it('renders an audio element', () => {
    const elem = wrapper.find('audio');
    expect(elem.length).toEqual(1);
  });

  describe('#drum-pad', () => {
    const elem = wrapper.find('.drum-pad');
    it('is clickable', () => {
      expect(elem.prop('onClick')).toBeFunction();
    });
  });

  describe('An audio element', () => {
    const elem = wrapper.find('audio');
    it('has a class name of clip', () => {
      expect(elem.hasClass('clip')).toEqual(true);
    });

    it('contains src attribute', () => {
      expect(elem.prop('src')).toEqual('file.mp3');
    });

    it('has id corresponding to the inner text of its parent', () => {
      const id = elem.prop('id');
      expect(wrapper.contains(id)).toEqual(true);
    });
  });
});
