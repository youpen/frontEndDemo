import { put, take, call } from 'redux-saga/effects';

import * as API from '../API/UserAuthentication'
import { actionLogin, actionLoginDone, actionLoginFail } from './actions'
import { actionSetCurrentScreen } from '../routes/actions'

export function* sagaLogin() {
  while (true) {
    try {
      const action = yield take(actionLogin);
      yield call (API.login, action)
      yield put({ type: actionLoginDone });
      yield put({ type: actionSetCurrentScreen, payload: { currentScreen:'ListingScreen' } });
    } catch (e) {
      yield put({ type: actionLoginFail });
      throw new Error(e.message)
    }
  }

}