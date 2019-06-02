import { fork } from 'redux-saga/effects';
import { sagaLogin } from '../loginScreen/sagas';
import {
  sagaEvents,
  sagaComments,
  sagaParticipants,
  sagaChannels
} from '../listingScreen/sagas'


export default function* root() {
  yield fork(sagaLogin)
  yield fork(sagaEvents)
  yield fork(sagaComments)
  yield fork(sagaParticipants)
  yield fork(sagaChannels)
}