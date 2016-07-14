import makeStrore from './src/store.js';
import startServer from './src/server.js';
const initialEntries = require('./entries.json');

export const store = makeStrore();
startServer(store);

store.dispatch({
  type: 'SET_ENTRIES',
  entries: initialEntries,
});

store.dispatch({
  type: 'NEXT',
});

