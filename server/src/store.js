import { createStore } from 'redux';
import reducer from './reducer.js';

export default function makeStrore() {
  return createStore(reducer);
}

