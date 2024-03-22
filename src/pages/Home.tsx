export default function Home() {
	return (
		<div className="w-[900px]">
			<div className="bg-gray-50/90 w-full py-12">
				<div className="container grid max-w-6xl px-4 gap-6 md:grid-cols-2 md:px-6">
					<div className="flex flex-col justify-center space-y-4">
						<div className="space-y-2">
							<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
								Enhance your child's reading skills
							</h1>
							<p className="max-w-[500px] text-gray-500 md:text-xl dark:text-gray-400">
								Let your child practice reading with AI-generated stories and
								record their voice to improve fluency.
							</p>
						</div>
					</div>
					<img src="src/assets/home_img.jpg" alt="child hold a headphone" />
				</div>
			</div>
			<section className="w-full py-12 md:py-16 xl:py-24 ">
				<div className="flex flex-col items-center space-y-4 text-center">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							How it works
						</h2>
						<p className="max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
							Follow these simple steps to get your child started with the
							reading app.
						</p>
					</div>
					<div className="grid max-w-sm gap-4 border border-gray-200 rounded-lg bg-gray-50 p-4 text-sm leading-none divide-y divide-gray-200 dark:border-gray-800 dark:bg-gray-950 dark:divide-gray-800">
						<div className="flex items-center  gap-2">
							<div className="w-4 h-4 rounded-full bg-gray-900" />
							<p className="py-2.5">Choose a story to read</p>
						</div>
						<div className="flex items-center  gap-2">
							<div className="w-4 h-4 rounded-full bg-gray-900" />
							<p className="py-2.5">Start Recording your voice while reading</p>
						</div>
						<div className="flex items-center  gap-2">
							<div className="w-4 h-4 rounded-full bg-gray-900" />
							<p className="py-2.5">Get instance feedback to your spelling</p>
						</div>
						<div className="flex items-center  gap-2">
							<div className="w-4 h-4 rounded-full bg-gray-900" />
							<p className="py-2.5  dark:text-gray-400">
								Finish the reading session
							</p>
						</div>
						<div className="flex items-center  gap-2">
							<div className="w-4 h-4 rounded-full bg-gray-900" />
							<p className="py-2.5  dark:text-gray-400">Get your scoore</p>
						</div>
					</div>
				</div>
			</section>
			<section className="w-full py-12 md:py-16 xl:py-24">
				<div className="flex flex-col items-center space-y-4 text-center">
					<div className="space-y-2 flex items-center justify-center flex-col gap-4">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							Key Features
						</h2>
						<p className="max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
							The app comes with a range of features to make reading fun and
							engaging.
						</p>
						<div className="grid max-w-sm gap-4 border border-gray-200 rounded-lg bg-gray-50 p-4 text-sm leading-none divide-y divide-gray-200 dark:border-gray-800 dark:bg-gray-950 dark:divide-gray-800">
							<div className="flex items-center gap-4">
								<div className="w-4 h-4 rounded-full bg-gray-900" />
								<p className="py-2.5">AI-generated stories</p>
							</div>
							<div className="flex items-center gap-4">
								<div className="w-4 h-4 rounded-full bg-gray-900" />
								<p className="py-2.5">Voice recording</p>
							</div>
							<div className="flex items-center gap-4">
								<div className="w-4 h-4 rounded-full bg-gray-900" />
								<p className="py-2.5">Progress tracking</p>
							</div>
							<div className="flex items-center gap-4">
								<div className="w-4 h-4 rounded-full bg-gray-900" />
								<p className="py-2.5">Support a lot of laungue</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="w-full py-12 md:py-16 xl:py-24">
				<div className="flex flex-col items-center gap-4 px-4 md:px-6">
					<div className="space-y-2 text-center">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							Download the App
						</h2>
						<p className="max-w-[600px] text-gray-500/relaxed dark:text-gray-400">
							Help your child become a better reader. Download the app today!
						</p>
					</div>
					<form className="flex flex-col gap-4 min-[400px]:flex-row max-w-sm w-full">
						<input
							className="bg-white dark:bg-gray-950"
							placeholder="Enter your email"
							type="text"
						/>
						<button type="submit">Download</button>
					</form>
				</div>
			</section>
		</div>
	);
}

