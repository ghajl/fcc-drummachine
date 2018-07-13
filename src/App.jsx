import React from 'react';
import PropTypes from 'prop-types';


export const Pad = ({
  id,
  label,
  children,
  src,
  audioRef,
  buttonRef,
  className,
  ...props
}) => (
  <button
    id={id}
    className={`drum-pad ${className}`}
    type="button"
    ref={buttonRef}
    {...props}
  >
    <audio
      className="clip"
      id={id}
      ref={audioRef}
      preload="auto"
      src={src}
    >
      Your browser does not support the audio element.
    </audio>
    {children}
  </button>
);

export const Display = ({ className, children }) => (
  <div id="display" className={`display ${className}`}>
    {children}
  </div>
);


export const drumMachineHelper = {
  makePadObject: function makePadObject(key, label, name, src) {
    const pad = {
      key,
      label,
      name,
      src: `static/${src}`,
    };
    return pad;
  },
};


export class DrumMachine extends React.Component {
  constructor() {
    super();
    this.pads = [];
    this.helper = drumMachineHelper;
    this.pads.push(this.helper.makePadObject('Q', 'HT', 'HI TOM', 'Hi Tom0003.mp3'));
    this.pads.push(this.helper.makePadObject('W', 'MT', 'MID TOM', 'Mid Tom0002.mp3'));
    this.pads.push(this.helper.makePadObject('E', 'LT', 'LOW TOM', 'Low Tom0002.mp3'));
    this.pads.push(this.helper.makePadObject('A', 'HH', 'HI-HAT', 'Open Hihat0001.mp3'));
    this.pads.push(this.helper.makePadObject('S', 'CY', 'CYMBAL', 'CYmbal0016.mp3'));
    this.pads.push(this.helper.makePadObject('D', 'SD', 'SNARE DRUM', 'SnareDrum0002.mp3'));
    this.pads.push(this.helper.makePadObject('Z', 'BD', 'BASS DRUM', 'KickDrum0015.mp3'));
    this.pads.push(this.helper.makePadObject('X', 'CL', 'CLAP', 'Clap.mp3'));
    this.pads.push(this.helper.makePadObject('C', 'CB', 'COWBELL', 'Cowbell.mp3'));
    this.keys = {};
    this.pads.forEach((pad) => {
      this.keys[pad.key] = pad;
    });
    this.state = {
      output: '---',
    };
  }

  componentWillMount() {
    document.addEventListener('keydown', e => this.onKeyPressed(e));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', e => this.onKeyPressed(e));
  }

  onKeyPressed = (e) => {
    e.preventDefault();
    let { key } = e;
    if (key && /[a-z]/i.test(key)) {
      key = key.toUpperCase();
      if (typeof this.keys[key] !== 'undefined') {
        const pad = this.keys[key];
        this.handleClick(e, pad);
      }
    }
  }

  handleClick = (e, pad) => {
    if (pad) {
      pad.audio.current.currentTime = 0;
      pad.audio.current.play();
      this.setState({ output: pad.name });
    }
  }

  renderPad = (pad) => {
    pad.audio = React.createRef();
    pad.button = React.createRef();
    return (
      <Pad
        key={pad.key}
        id={pad.key}
        label={pad.label}
        src={pad.src}
        audioRef={pad.audio}
        buttonRef={pad.button}
        onClick={e => this.handleClick(e, pad)}
      >
        <div className="pad-text">
          <span className="pad-key">
            {pad.key}
          </span>
          <span className="pad-label">
            {pad.label}
          </span>
        </div>
      </Pad>
    );
  }

  render() {
    const { output } = this.state;
    return (
      <div id="drum-machine">
        <div className="display-wrapper">
          <Display>
            {output}
          </Display>
        </div>
        <div className="pads-wrapper">
          <div className="row">
            {this.pads.slice(0, 3).map(pad => this.renderPad(pad))}
          </div>
          <div className="row">
            {this.pads.slice(3, 6).map(pad => this.renderPad(pad))}
          </div>
          <div className="row">
            {this.pads.slice(6).map(pad => this.renderPad(pad))}
          </div>
        </div>
      </div>
    );
  }
}

Pad.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Display.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Display.defaultProps = {
  className: '',
};
