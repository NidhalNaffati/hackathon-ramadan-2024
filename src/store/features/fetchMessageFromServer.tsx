import {createAsyncThunk} from "@reduxjs/toolkit";
// const API_KEY = //  "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";

export const fetchMessageFromServer = createAsyncThunk(
	"textAi/fetchMessage",
	async (message: string) => {
		const option: RequestInit = {
			method: "POST",
			headers: {
				Authorization: `Bearer `,
				"Content-Type": "application/json", // assuming your content type is JSON
			},
			body: JSON.stringify({
				model: "gpt-3.5-turbo",
				messages: [
					{
						role: "system",
						content:
							"You are a author who write children stories about what they want.",
					},
					{
						role: "user",
						content: message,
					},
				],
			}),
		};

		const responce = await fetch(
			"https://api.openai.com/v1/chat/completions",
			option,
		);
		console.log(responce);
	},
);
