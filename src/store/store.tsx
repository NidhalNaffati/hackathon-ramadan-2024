import {configureStore} from "@reduxjs/toolkit";
import getAigeneratedText from "./features/getAigeneratedText";
// ...

export const store = configureStore({
	reducer: {
		text: getAigeneratedText,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
