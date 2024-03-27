/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
const express = require("express");
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const Anthropic = require("@anthropic-ai/sdk");
// eslint-disable-next-line no-undef
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000; // Choose any available port
const API_KEY =
	"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";
app.use(bodyParser.json());

// Add middleware to handle preflight requests
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	if (req.method === "OPTIONS") {
		// Respond to preflight requests immediately
		res.status(200).end();
	} else {
		next();
	}
});

// Define a route to proxy requests to the external API
app.use("/api", async (req, res) => {
	const {message} = req.body;

	try {
		const anthropic = new Anthropic({
			apiKey: API_KEY, // defaults to process.env["ANTHROPIC_API_KEY"]
		});

		const msg = await anthropic.messages.create({
			model: "claude-3-opus-20240229",
			max_tokens: 1024,
			messages: [
				{
					role: "user",
					content: `you are a author so make a children story from this context and get a pure story without words like Here is a short children's story based on the given context : ${message}`,
				},
			],
		});

		// Forward the API response back to the frontend
		res.json(msg);
	} catch (error) {
		console.error("Error proxying request:", error);
		res.status(500).send("Internal Server Error");
	}
});

// Start the proxy server
app.listen(PORT, () => {
	console.log(`Proxy server is running on http://localhost:${PORT}`);
});
