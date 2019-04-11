import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dishes } from './dishes';
import { comments } from './comments';

import { favorites } from './favorites';
import { joblists } from './joblists';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

const config = {
    key: 'root',
    storage,
    debug: true
  }

export const ConfigureStore = () => {

  const config = {
    key: 'root',
    storage,
    debug: true

  };

    const store = createStore(
        persistCombineReducers(config, {
            dishes,
            comments,
            favorites,
            joblists
        }),
    applyMiddleware(thunk, logger)
  );

  const persistor = persistStore(store)

  return { persistor, store };
};
