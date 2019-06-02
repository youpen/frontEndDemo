import React from 'react';
import { Provider } from 'react-redux'

import Route from './routes'
import { configureStore } from './store/configureStore'
import rootSaga from './store/sagas';

const store = configureStore();
store.runSaga(rootSaga);



function Root() {
  return (
    <Provider store={store} >
        <Route />
    </Provider>
  );
}



export default Root;
