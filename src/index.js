import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.scss';

const Pad = (props) => {
	return (
		<button 

			id={props.id}
			className="drum-pad">
			<audio
			  src="static/bloot.mp3"
			  className="clip"
			  id={props.label}
			  >
			  Your browser does not support the <code>audio</code> element.
			</audio>
		{props.label}	
		</button>
	)
}

class DrumMachine extends React.Component {

	pads = [
		{
			id: '1',
			label: 'Q'
		},
		{
			id: '2',
			label: 'W'
		},
		{
			id: '3',
			label: 'E'
		},
		{
			id: '4',
			label: 'A'
		},
		{
			id: '5',
			label: 'S'
		},
		{
			id: '6',
			label: 'D'
		},
		{
			id: '7',
			label: 'Z'
		},
		{
			id: '8',
			label: 'X'
		},
		{
			id: '9',
			label: 'C'
		},
	];

	render() {
		return (
			<div id="drum-machine">
				<div id="display">
				</div>
				<div className="pads-wrapper"> 
					<div className="row">
            {this.pads.slice(0,3).map(pad => 
            	<Pad key={pad.id} id={pad.id} label={pad.label} />
            )}
          </div>
          <div className="row">
            {this.pads.slice(3,6).map(pad => 
            	<Pad key={pad.id} id={pad.id} label={pad.label} />
            )}
          </div>
          <div className="row">
            {this.pads.slice(6).map(pad => 
            	<Pad key={pad.id} id={pad.id} label={pad.label} />
            )}
          </div>
				</div>
			</div>
		)
	}
}

ReactDOM.render(
	<DrumMachine />,
	document.getElementById('root')
)

