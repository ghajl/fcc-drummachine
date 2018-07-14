import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.scss';
import { DrumMachine } from './App';


const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<DrumMachine />, rootElement);
} else {
  ReactDOM.render(<DrumMachine />, rootElement);
}
