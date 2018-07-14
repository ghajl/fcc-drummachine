import React from 'react';
import PropTypes from 'prop-types';


export class Pad extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { className } = this.props;
    return (className > nextProps.className)
      || (className < nextProps.className);
  }

  render() {
    const {
      id,
      label,
      children,
      src,
      audioRef,
      buttonRef,
      className,
      ...props
    } = this.props;
    return (
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
  }
}

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
      src,
      audio: React.createRef(),
      button: React.createRef(),
    };
    return pad;
  },
};


export class DrumMachine extends React.Component {
  constructor() {
    super();
    this.pads = [];
    this.helper = drumMachineHelper;
    this.pads.push(this.helper.makePadObject('Q', 'HT', 'HI TOM', 'static/Hi Tom0003.mp3'));
    this.pads.push(this.helper.makePadObject('W', 'MT', 'MID TOM', 'static/Mid Tom0002.mp3'));
    this.pads.push(this.helper.makePadObject('E', 'LT', 'LOW TOM', 'static/Low Tom0002.mp3'));
    this.pads.push(this.helper.makePadObject('A', 'HH', 'HI-HAT', 'static/Open Hihat0001.mp3'));
    this.pads.push(this.helper.makePadObject('S', 'CY', 'CYMBAL', 'static/CYmbal0016.mp3'));
    this.pads.push(this.helper.makePadObject('D', 'SD', 'SNARE DRUM', 'static/SnareDrum0002.mp3'));
    this.pads.push(this.helper.makePadObject('Z', 'BD', 'BASS DRUM', 'static/KickDrum0015.mp3'));
    this.pads.push(this.helper.makePadObject('X', 'CL', 'CLAP', 'static/Clap.mp3'));
    this.pads.push(this.helper.makePadObject('C', 'CB', 'COWBELL', 'static/Cowbell.mp3'));
    this.keys = {};
    this.pads.forEach((pad) => {
      this.keys[pad.key] = pad;
    });
    this.state = {
      output: '---',
      active: '',
    };
  }

  componentWillMount() {
    document.addEventListener('keydown', e => this.onKeyDown(e));
    document.addEventListener('keyup', e => this.onKeyUp(e));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', e => this.onKeyDown(e));
    document.removeEventListener('keyup', e => this.onKeyUp(e));
  }

  onKeyDown = (e) => {
    e.preventDefault();
    let { key } = e;
    if (key && /[a-z]/i.test(key)) {
      key = key.toUpperCase();
      if (typeof this.keys[key] !== 'undefined') {
        const pad = this.keys[key];
        this.setState({ active: key });
        this.handleClick(e, pad);
      }
    }
  }

  onKeyUp = (e) => {
    e.preventDefault();
    let { key } = e;
    if (key && /[a-z]/i.test(key)) {
      key = key.toUpperCase();
      if (typeof this.keys[key] !== 'undefined') {
        this.setState({ active: '' });
      }
    }
  }

  handleClick = (e, pad) => {
    if (pad) {
      this.setState({ output: pad.name });
      pad.audio.current.currentTime = 0;
      pad.audio.current.play();
    }
  }

  renderPad = (pad) => {
    const { active } = this.state;
    const className = pad.key === active ? 'active' : '';
    const onClick = e => this.handleClick(e, pad);
    const {
      key, label, src, audio, button,
    } = pad;
    const props = {
      key,
      label,
      src,
      className,
      onClick,
    };
    return (
      <Pad
        id={key}
        audioRef={audio}
        buttonRef={button}
        {...props}
      >
        <div className="pad-text">
          <span className="pad-key">
            {key}
          </span>
          <span className="pad-label">
            {label}
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
            {this.pads.slice(0, 3).map(this.renderPad)}
          </div>
          <div className="row">
            {this.pads.slice(3, 6).map(this.renderPad)}
          </div>
          <div className="row">
            {this.pads.slice(6).map(this.renderPad)}
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
  className: PropTypes.string,
};

Pad.defaultProps = {
  className: '',
};

Display.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Display.defaultProps = {
  className: '',
};
