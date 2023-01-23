import { configureStore, combineReducers } from "@reduxjs/toolkit";

import reducers from "../reducer";

import type { PreloadedState } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    ...reducers,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export const allReducers = combineReducers({
  ...reducers,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: allReducers,
    preloadedState,
  });
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof allReducers>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppStore = ReturnType<typeof setupStore>;

export default store;
