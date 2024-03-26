const TextAiGenerator: React.FC = () => {
	return (
		<>
			<div className="flex flex-col items-center justify-center text-white p-4">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					className="text-white h-12 w-12"
				>
					<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path>
					<path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path>
				</svg>
				<h1 className="text-3xl font-semibold mt-4 mb-8">
					What you want to read today?
				</h1>
				<div className="grid grid-cols-2 gap-4 mb-8">
					<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[#333] hover:bg-[#444] text-white">
						Write a spreadsheet formula to convert a date to the weekday
					</button>
					<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[#333] hover:bg-[#444] text-white">
						Tell me a fun fact about the Roman Empire
					</button>
					<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[#333] hover:bg-[#444] text-white">
						Brainstorm names for an orange cat we're adopting from the shelter
					</button>
					<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[#333] hover:bg-[#444] text-white">
						Suggest fun activities to help me make friends in a new city
					</button>
				</div>
				<div className="flex w-full max-w-md items-center border border-gray-600 rounded-full px-4 py-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						className="text-gray-400 h-6 w-6"
					>
						<path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
					</svg>
					<input
						placeholder="Message ChatGPT..."
						className="bg-transparent flex-1 border-none text-white placeholder-gray-400 ml-4 mr-2 py-1 px-2 focus:ring-0"
						type="text"
					/>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						className="text-gray-400 h-6 w-6"
					>
						<path d="m22 2-7 20-4-9-9-4Z"></path>
						<path d="M22 2 11 13"></path>
					</svg>
				</div>
			</div>
		</>
	);
};

export default TextAiGenerator;
