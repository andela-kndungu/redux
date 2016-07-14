import makeStrore from './src/store.js';
import startServer from './src/server.js';

export const store = makeStrore();
startServer(store);

