import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
require('jest-extended');

configure({ adapter: new Adapter() });
