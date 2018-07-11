import React from 'react';
import PropTypes from 'prop-types';


const Pad = ({
  id,
  label,
  children,
  src,
  padRef,
  className,
  ...props
}) => (
  <button
    id={id}
    className={`drum-pad ${className}`}
    type="button"
    {...props}
  >
    <audio
      className="clip"
      id={label}
      ref={padRef}
      preload="auto"
      src={src}
    >
      Your browser does not support the audio element.
    </audio>
    {children}
  </button>
);

const Display = ({ className, children }) => {
  return (
    <div id="display" className={`display ${className}`}>
      {children}
    </div>
  );
};


export const drumMachineHelper = {
  makePadObject: function makePadObject(id, label, name, src) {
    const pad = {
      id,
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
    this.pads.push(this.helper.makePadObject('1', 'Q', 'HITOM', 'Hi Tom0003.mp3'));
    this.pads.push(this.helper.makePadObject('2', 'W', 'MIDTOM', 'Mid Tom0002.mp3'));
    this.pads.push(this.helper.makePadObject('3', 'E', 'LOWTOM', 'Low Tom0002.mp3'));
    this.pads.push(this.helper.makePadObject('4', 'A', 'HIHAT', 'Open Hihat0001.mp3'));
    this.pads.push(this.helper.makePadObject('5', 'S', 'CYMBAL', 'CYmbal0016.mp3'));
    this.pads.push(this.helper.makePadObject('6', 'D', 'SNARE', 'SnareDrum0002.mp3'));
    this.pads.push(this.helper.makePadObject('7', 'Z', 'BASS', 'KickDrum0015.mp3'));
    this.pads.push(this.helper.makePadObject('8', 'X', 'CLAP', 'Clap.mp3'));
    this.pads.push(this.helper.makePadObject('9', 'C', 'COWBELL', 'Cowbell.mp3'));
    this.state = {
      output: 'PRESS THE BUTTON!',
    };
  }

  handleClick = (e, pad) => {
    if (pad) {
      pad.audio.current.currentTime = 0;
      pad.audio.current.play();
      this.setState({ output: pad.name });
    }
  }


  render() {
    const { output } = this.state;
    return (
      <div id="drum-machine">
        <Display>
          {output}
        </Display>
        <div className="pads-wrapper">
          <div className="row">
            {this.pads.slice(0, 3).map((pad) => {
              pad.audio = React.createRef();
              return (
                <Pad
                  key={pad.id}
                  id={pad.id}
                  label={pad.label}
                  src={pad.src}
                  padRef={pad.audio}
                  className=""
                  onClick={e => this.handleClick(e, pad)}
                >
                  {pad.label}
                </Pad>
              );
            })}
          </div>
          <div className="row">
            {this.pads.slice(3, 6).map((pad) => {
              pad.audio = React.createRef();
              return (
                <Pad
                  key={pad.id}
                  id={pad.id}
                  label={pad.label}
                  src={pad.src}
                  padRef={pad.audio}
                  className=""
                  onClick={e => this.handleClick(e, pad)}
                >
                  {pad.label}
                </Pad>
              );
            })}
          </div>
          <div className="row">
            {this.pads.slice(6).map((pad) => {
              pad.audio = React.createRef();
              return (
                <Pad
                  key={pad.id}
                  id={pad.id}
                  label={pad.label}
                  src={pad.src}
                  padRef={pad.audio}
                  className=""
                  onClick={e => this.handleClick(e, pad)}
                >
                  {pad.label}
                </Pad>
              );
            })}
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
