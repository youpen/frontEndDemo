import { bindActionCreators } from 'redux'

export const actionSetCurrentScreen = 'actionSetCurrentScreen';

export const setCurrentScreenCreator = (value) => ({
  type: actionSetCurrentScreen,
  payload: value,
})

export const screenMap = {
  loginScreen: 'LoginScreen',
  listingScreen: 'ListingScreen',
  listDetailScreen: 'ListDetailScreen',
}
