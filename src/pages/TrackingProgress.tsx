import TaskElement from "../components/TaskElement";
import {useAppSelector} from "../store/hooks";
export default function TrackingProgress() {
	// Get current date
	const today = new Date();

	// Get day, month, and year
	let day = today.getDate().toString();
	let month = (today.getMonth() + 1).toString(); // Months are zero-based
	const year = today.getFullYear().toString();

	// Format day and month to have leading zeroes if necessary
	day = parseInt(day) < 10 ? "0" + day : day;
	month = parseInt(month) < 10 ? "0" + month : month;

	// Concatenate day, month, and year with "/"
	const formattedDate = day + "/" + month + "/" + year;
	const Tasks = useAppSelector((state) => state.text.Tasks);
	return (
		<div className="p-6">
			<h1 className="font-bold text-[1.25rem] mb-[1rem]">
				Today {formattedDate}
			</h1>
			<ul className="flex flex-col items-center">
				{Tasks.map((item) => {
					return (
						<TaskElement
							title={item.title}
							numberWords={item.totalWords}
							wrongSpellingWords={item.wrongSpellingWords}
							accuracy={item.accuracy}
							wordParMinute={15}
						/>
					);
				})}
			</ul>
		</div>
	);
}
