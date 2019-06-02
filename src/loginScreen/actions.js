import { bindActionCreators } from 'redux'

export const actionLogin = 'actionTypeLogin';
export const actionLoginDone = 'actionLoginDone';
export const actionLoginFail = 'actionLoginFail'


function actionCreator(type, payload) {
  return { type, payload }
}

export const loginActionCreator = (value) => ({
  type: actionLogin,
  payload: value,
})


