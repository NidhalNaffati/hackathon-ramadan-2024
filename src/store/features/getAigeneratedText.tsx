import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store";
// Define a type for the slice state
interface textAiState {
	message: string;
}

// Define the initial state using that type
const initialState: textAiState = {
	message: "",
};

export const TextAiGenerator = createSlice({
	name: "textAi",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		// Use the PayloadAction type to declare the contents of `action.payload`
		getUserMessage: (state, action: PayloadAction<string>) => {
			state.message = action.payload;
			console.log(action.payload);
		},
	}
});

export const {getUserMessage} = TextAiGenerator.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.text.message;

export default TextAiGenerator.reducer;
