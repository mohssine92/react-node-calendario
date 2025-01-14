import { combineReducers } from 'redux';

import { uiReducer } from './uiReducer';
import { calendarReducer } from './calendarReducer';
import { authReducer } from './authReducer';



export const rootReducer = combineReducers({
   ui: uiReducer,
   calendar: calendarReducer,
   auth: authReducer
})

/* root reducer no va ser nada mas que combinacion de todos mi reducers */