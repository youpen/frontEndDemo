import { combineReducers } from 'redux'
import { login } from '../loginScreen/reducer';
import { route } from '../routes/routeReducer';
import { events } from '../listingScreen/reducer';
export const rootReducer = combineReducers({
  login,
  route,
  events,
})

