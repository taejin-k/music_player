import { combineReducers, configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";

export type RootState = ReturnType<typeof store.getState>;
export type RootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
  modal: modalReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
