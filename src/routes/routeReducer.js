import * as ActionsTypes from './actions';



export const route = (state, action) => {
  if (!state) {
    if (window.__token__) {
      console.log(window.__token__)
      state = { currentScreen: 'ListingScreen' }
    } else {
      state = { currentScreen: 'LoginScreen' }
    }
  }

  if (action.payload) {}
  // TODO 改为preloadState
  switch (action.type) {
    case ActionsTypes.actionSetCurrentScreen:
      // 切换路由
      return { ...state, ...action.payload };
    default:
      return state;
  }
}