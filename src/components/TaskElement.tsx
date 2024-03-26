import React from "react";

interface TaskProps {
	title: string;
	language: string;
	wordParMinute: number;
	numberWords: number;
	duration: {
		minutes: number;
		seconds: number;
	};
	comprehension: number;
}
const TaskElement: React.FC<TaskProps> = ({
	title,
	language,
	wordParMinute,
	numberWords,
	duration,
	comprehension,
}) => {
	// we need to change the time here it's not related to the exacte time were the task start
	const today = new Date();
	const readingSession = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
	return (
		<>
			<div className="border bg-white text-black w-full rounded-lg shadow-sm">
				<div className="flex-col space-y-1.5 py-2 flex items-center gap-4">
					<div className="flex flex-col text-center">
						<p>{readingSession}</p>
						<h3 className="font-semibold whitespace-nowrap tracking-tight text-base">
							Session #123
						</h3>
						<p>Title:{title}</p>
						<p className="text-muted-foreground text-sm">
							Started 2 minutes ago
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-4 p-2">
					<ul className="grid grid-cols-2 gap-2 text-sm">
						<li className=" flex items-center justify-between">
							<span className="font-medium">Duration</span>
							<span className="text-right">
								{duration.minutes}m:{duration.seconds}s
							</span>
						</li>
						<li className=" flex items-center justify-between">
							<span className="font-medium">Words Read</span>
							<span className="text-right">{numberWords}</span>
						</li>
						<li className="flex items-center justify-between">
							<span className="font-medium">Language</span>
							<span className="text-right">{language}</span>
						</li>
						<li className=" flex items-center justify-between">
							<span className="font-medium">Spelling Mistakes</span>
							<span className="text-right">2</span>
						</li>
						<li className=" flex items-center justify-between">
							<span className="font-medium">Words per minute</span>
							<span className="text-right">
								{wordParMinute} word per minute
							</span>
						</li>
						<li className="flex items-center justify-between">
							<span className="font-medium">Comprehension</span>
							<span className="text-right">{comprehension}% accuracy</span>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};
export default TaskElement;
