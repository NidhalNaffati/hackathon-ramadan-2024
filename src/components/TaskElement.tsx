import React from "react";

import {useTranslation} from "react-i18next";

interface TaskProps {
	title: string;
	wordParMinute: number;
	numberWords: number;
	wrongSpellingWords: number;
	accuracy: string;
}
const TaskElement: React.FC<TaskProps> = ({
	title,
	wordParMinute,
	numberWords,
	wrongSpellingWords,
	accuracy,
}) => {
	// we need to change the time here it's not related to the exacte time were the task start
	const today = new Date();
	const readingSession = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
	// const title = useAppSelector((state) => state.text.title);

	//const dispatch = useAppDispatch();
	//dispatch(changeForDispatch(false)); // set to default to provent getAllElements

	const {t, i18n} = useTranslation();
	return (
		<>
			<div className="border bg-white text-black w-full rounded-lg shadow-sm">
				<div className="flex-col space-y-1.5  flex items-center gap-4">
					<div className="flex flex-col text-center">
						<p>{readingSession}</p>
						<h3 className="font-semibold whitespace-nowrap tracking-tight text-base">
							Session #123
						</h3>
						<p className="text-muted-foreground text-sm">
							Started 2 minutes ago
						</p>
					</div>
				</div>
				<div className=" bg-white text-black w-full rounded-lg shadow-sm">
					<div className="flex-col space-y-1.5 py-2 flex items-center gap-4">
						<div className="flex flex-col text-center">
							<p
								className={
									i18n.resolvedLanguage == "ar"
										? "direction font-bold"
										: "font-bold"
								}
							>
								{t("Title")}:{title}
							</p>
						</div>
					</div>
					<div className="flex flex-col gap-4 p-2">
						<ul className="grid grid-cols-2 gap-2 text-sm">
							<li
								className={
									i18n.resolvedLanguage == "ar"
										? "flex items-center justify-between direction"
										: "flex items-center justify-between"
								}
							>
								<span className="font-medium">{t("Words Read")}</span>
								<span className="text-right">{numberWords}</span>
							</li>
							<li
								className={
									i18n.resolvedLanguage == "ar"
										? "flex items-center justify-between direction"
										: "flex items-center justify-between"
								}
							>
								<span className="font-medium">{t("Language")}</span>
								<span className="text-right">
									{i18n.resolvedLanguage == "ar" ? "عربي" : "English"}
								</span>
							</li>
							<li
								className={
									i18n.resolvedLanguage == "ar"
										? "flex items-center justify-between direction"
										: "flex items-center justify-between"
								}
							>
								<span className="font-medium">{t("Spelling Mistakes")}</span>
								<span className="text-right">{wrongSpellingWords}</span>
							</li>
							<li
								className={
									i18n.resolvedLanguage == "ar"
										? "flex items-center justify-between direction"
										: "flex items-center justify-between"
								}
							>
								<span className="font-medium">{t("words per minute")}</span>
								<span className="text-right">
									{wordParMinute} {t("word minute")}
								</span>
							</li>
							<li
								className={
									i18n.resolvedLanguage == "ar"
										? "flex items-center justify-between direction"
										: "flex items-center justify-between"
								}
							>
								<span className="font-medium">{t("Accuracy")}</span>
								<span className="text-right">{accuracy}%</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};
export default TaskElement;
