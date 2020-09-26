import { combineReducers } from "redux";
import calenderReducer from "./calendar/";
import emailReducer from "./email/";
import chatReducer from "./chat/";
import todoReducer from "./todo/";
import customizer from "./customizer/";
import authVuexy from "./auth/";
import navbar from "./navbar/Index";
import dataList from "./data-list/";

import auth from './auth/azure/auth';
import profile from './auth/azure/profile';
import ui from './auth/azure/ui';

const rootReducer = combineReducers({
  auth,
  profile,
  ui,
  calendar: calenderReducer,
  emailApp: emailReducer,
  todoApp: todoReducer,
  chatApp: chatReducer,
  customizer: customizer,
  authVuexy: authVuexy,
  navbar: navbar,
  dataList: dataList,
});

export default rootReducer;
