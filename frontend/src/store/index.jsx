import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import { DevTools } from 'containers/DevTools';
import reducers from 'reducers';
import { isProduction } from 'utils';

export const configureStore = (initialState, history) => {
  // Logger
  const logger = createLogger();

  // History
  const historyMiddleware = routerMiddleware(history);

  // Enhancer
  let enhancer;
  if (isProduction) {
    enhancer = applyMiddleware(historyMiddleware, thunk, promise, logger);
  } else {
    enhancer = compose(
      applyMiddleware(historyMiddleware, thunk, promise, logger),
      DevTools.instrument(),
    );
  }

  const store = createStore(connectRouter(history)(reducers), initialState, enhancer);

  // Enable Webpack hot module replacement for reducers
  if (!isProduction && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducers = require('reducers').default;
      store.replaceReducer(connectRouter(history)(nextReducers));
    });
  }

  return store;
};
