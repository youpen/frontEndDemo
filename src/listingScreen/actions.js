
export const actionFetchEvents = 'actionFetchEvents';
export const actionFetchEventsDone = 'actionFetchEventsDone';
export const actionFetchEventsFail = 'actionFetchEventsFail';

export const actionResetEvents = 'actionResetEvents';

export function eventsActionCreator(payload) {
  return {
    type: actionFetchEvents,
    payload
  }
}

export function resetEventsActionCreator () {
  return {
    type: actionResetEvents,
  }
}

export const actionFetchComments = 'actionFetchComments'
export const actionFetchCommentsDone = 'actionFetchCommentsDone'
export const actionFetchCommentsFail = 'actionFetchCommentsFail'
export function fetchCommentsCreator(payload) {
  return {
    type: actionFetchComments,
    payload
  }
}

export const actionFetchParticipants = 'actionFetchParticipants'
export const actionFetchParticipantsDone = 'actionFetchParticipantsDone'
export const actionFetchParticipantsFail = 'actionFetchParticipantsFail'
export function fetchParticipantsCreator(payload) {
  return {
    type: actionFetchParticipants,
    payload
  }
}

export const actionSetDateFilter = 'actionSetDateFilter'
export const actionSetChannelFilter = 'actionSetChannelFilter'
export const actionSetCurrentPageSize = 'actionSetCurrentPageSize'

export const actionSetCurrentDetailPage = 'actionSetCurrentDetailPage'

export const actionResetFilter = 'actionResetFilter'

export function setDateFilterCreator(payload) {
  return {
    type: actionSetDateFilter,
    payload
  }
}

export function setChannelFilterCreator(payload) {
  return {
    type: actionSetChannelFilter,
    payload
  }
}

export function setCurrentPageSizeCreator(payload) {
  return {
    type: actionSetCurrentPageSize,
    payload
  }
}

export function setCurrentDetailPageCreator(payload) {
  return {
    type: actionSetCurrentDetailPage,
    payload
  }
}

export function setResetFilterCreator() {
  return {
    type: actionResetFilter,
  }
}


export const actionFetchChannels = 'actionFetchChannels'
export const actionFetchChannelsDone = 'actionFetchChannelsDone'
export const actionFetchChannelsFail = 'actionFetchChannelsFail'
export function fetchChannelsCreator(payload) {
  return {
    type: actionFetchChannels,
    payload
  }
}
