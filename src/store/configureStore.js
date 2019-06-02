import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './rootReducer'
import createSagaMiddleware from 'redux-saga';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



export const configureStore = (preloadedState) => {
  // TODO 改为preloadState
  const token = localStorage.getItem('__token__');
  if (token) {
    window.__token__ = token;
  }
  const initialScreen = window.__token__ ? 'ListingScreen' : 'LoginScreen'
  const initialState = {
    route: {
      currentScreen: initialScreen,
    }
  }
  preloadedState = initialState;

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(sagaMiddleware)
    )
  );
  return { ...store, runSaga: sagaMiddleware.run };
}