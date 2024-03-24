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

	return (
		<div className="container p-6">
			<h1>Today {formattedDate}</h1>
			<h3>Total time exercie today is 2m:32s</h3>
			<ul>
				<li>
					<p>
						{today.getHours()}:{today.getMinutes()}:{today.getSeconds()}
					</p>
					<p>Title:The Adventures of Tom Sawyer</p>
					<p>Language:English</p>
					<p>25 word par minute</p>
					<p>Duration: 2m:32s</p>
					<p>Comprehension : 60% accuracy</p>
				</li>
			</ul>
		</div>
	);
}
