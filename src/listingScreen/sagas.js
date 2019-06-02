import { put, take, call } from 'redux-saga/effects';

import * as API from '../API/Events'
import {
  actionFetchEventsDone,
  actionFetchEvents,
  actionFetchEventsFail,
  actionFetchComments,
  actionFetchCommentsDone,
  actionFetchCommentsFail,
  actionFetchParticipants,
  actionFetchParticipantsDone,
  actionFetchParticipantsFail,
  actionFetchChannels,
  actionFetchChannelsDone,
  actionFetchChannelsFail
} from './actions'

export function* sagaEvents() {
  while (true) {
    try {
      const action = yield take(actionFetchEvents);
      const data = yield call (API.fetchEvents, action.payload) // { events: list, hasMore:boolean}
      yield put({ type: actionFetchEventsDone, payload: data });
    } catch (e) {
      yield put({ type: actionFetchEventsFail });
      throw new Error(e.message)
    }
  }

}

export function* sagaComments() {
  while (true) {
    try {
      const action = yield take(actionFetchComments);
      const data = yield call (API.fetchComments, action.payload) // { events: list, hasMore:boolean}
      yield put({ type: actionFetchCommentsDone, payload: data.comments });
    } catch (e) {
      yield put({ type: actionFetchCommentsFail });
      throw new Error(e.message)
    }
  }
}

export function* sagaParticipants() {
  while (true) {
    try {
      const action = yield take(actionFetchParticipants);
      const data = yield call (API.fetchParticipants, action.payload) // { events: list, hasMore:boolean}
      yield put({ type: actionFetchParticipantsDone, payload: data.users });
    } catch (e) {
      yield put({ type: actionFetchParticipantsFail });
      throw new Error(e.message)
    }
  }
}

export function* sagaChannels() {
  while (true) {
    try {
      const action = yield take(actionFetchChannels);
      const data = yield call (API.fetchChannels, action.payload) // { events: list, hasMore:boolean}
      yield put({ type: actionFetchChannelsDone, payload: data.channels });
    } catch (e) {
      yield put({ type: actionFetchChannelsFail });
      throw new Error(e.message)
    }
  }
}