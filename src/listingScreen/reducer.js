import * as ActionsTypes from './actions';
import { combineReducers } from 'redux'

const initialState = {
  events: [],
  currentEvent: {},
  currentComments: []
}
export const events = (state = initialState, action) => {

  switch (action.type) {
    case ActionsTypes.actionFetchEventsDone:
      // const newEventsList = state.events.concat(action.payload)
      let { events, hasMore } = action.payload;
      events = state.events.concat(events);
      return { ...state, hasMore, events };
    case ActionsTypes.actionResetEvents:
      return { ...state, events: []}
    case ActionsTypes.actionSetDateFilter:
      return { ...state, ...action.payload };
    case ActionsTypes.actionSetChannelFilter:
      return { ...state, ...action.payload };
    case ActionsTypes.actionSetCurrentPageSize:
      return { ...state, ...action.payload };
    case ActionsTypes.actionSetCurrentDetailPage:
      return { ...state, ...action.payload };

    case ActionsTypes.actionFetchCommentsDone:
      return { ...state, currentComments: [ ...action.payload ] };
    case ActionsTypes.actionFetchParticipantsDone:
      return { ...state, currentParticipants: [ ...action.payload ] }
    case ActionsTypes.actionResetFilter:
      return { ...state, events: [], filterChannel: undefined, filterDate: undefined }
    case ActionsTypes.actionFetchChannelsDone:
      return { ...state, channels: [...action.payload] }
    default:
      return state;
  }
}



// const events = combineReducers({
//
// })