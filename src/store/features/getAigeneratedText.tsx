import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
// Define a type for the slice state
interface ElementTraitement {
	className: string;
	value: string;
}
interface Task {
	totalWords: number;
	title: string;
	accuracy: string;
	wrongSpellingWords: number;
}
interface textAiState {
	message: string;
	totalWords: number;
	title: string;
	AllElements: ElementTraitement[];
	accuracy: string;
	wrongSpellingWords: number;
	isReady: boolean;
	Tasks: Task[];
}

// Define the initial state using that type
const initialState: textAiState = {
	message: "",
	totalWords: 0,
	title: "",
	AllElements: [{className: "", value: ""}],
	accuracy: "0",
	wrongSpellingWords: 0,
	isReady: false,
	Tasks: [],
};

export const TextAiGenerator = createSlice({
	name: "textAi",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		// Use the PayloadAction type to declare the contents of `action.payload`
		getUserMessage: (state, action: PayloadAction<string>) => {
			state.message = action.payload;
			state.title = action.payload;
			console.log(action.payload);
		},
		getTotalNumberWords: (state, action: PayloadAction<number>) => {
			state.totalWords = action.payload;
		},
		/*getTextTitle: (state, action: PayloadAction<string>) => {
			state.title = action.payload;
		},*/
		getAccuracy: (
			state,
			action: PayloadAction<{trueWord: number; falseWord: number}>,
		) => {
			const accuracy = (action.payload.trueWord * 100) / state.totalWords;
			state.accuracy = accuracy.toFixed(2);
			console.log(accuracy);
		},
		getAllElementForAnalyse: (
			state,
			action: PayloadAction<ElementTraitement[]>,
		) => {
			const AllElements = action.payload; // get all elements
			console.log(AllElements);
			state.AllElements = AllElements;
		},
		changeForDispatch: (state, action: PayloadAction<boolean>) => {
			state.isReady = action.payload;
		},
		CreateNewTask: (state, action: PayloadAction<Task>) => {
			state.Tasks.push(action.payload);
		},
	},
});

export const {
	getUserMessage,
	getTotalNumberWords,
	getAccuracy,
	getAllElementForAnalyse,
	changeForDispatch,
	CreateNewTask,
} = TextAiGenerator.actions;

export default TextAiGenerator.reducer;
