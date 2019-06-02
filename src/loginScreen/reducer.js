import * as ActionsTypes from './actions';

export const login = (state = null, action) => {
  if (action.payload) {
  }
  switch (action.type) {
    case ActionsTypes.actionLoginDone:
      // 切换路由
      return { ...state, ...action.payload };
    default:
      return state;
  }
}