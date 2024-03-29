import {Link} from "react-router-dom";
import {useAppSelector} from "../store/hooks";
import {useTranslation} from "react-i18next";

function SpeechAnalyse() {
	const title = useAppSelector((state) => state.text.title);
	const message = useAppSelector((state) => state.text.message);
	//const dispatch = useAppDispatch();
	//dispatch(changeForDispatch(false)); // set to default to provent getAllElements
	const AllElementResult = useAppSelector((state) => state.text.AllElements);
	const totalNumber = useAppSelector((state) => state.text.totalWords);
	const accuracy = useAppSelector((state) => state.text.accuracy);
	const wrongSpellingWords = useAppSelector(
		(state) => state.text.wrongSpellingWords,
	);
	const {t, i18n} = useTranslation();
	return (
		<div>
			{message == "" && (
				<div className="flex justify-center">
					<Link
						to={"/Transcription"}
						className="my-[1rem] inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[#333] hover:bg-[#444] text-white mb-[1rem]"
					>
						{t("To get feedback read something first")}
					</Link>
				</div>
			)}
			{message != "" && (
				<div className="p-6">
					<h1
						className={
							i18n.resolvedLanguage == "ar"
								? "text-[2rem] text-center uppercase text-white mb-[1rem] direction"
								: "text-[2rem] text-center uppercase text-white mb-[1rem]"
						}
					>
						{t("Analyse your speech")}
					</h1>
					<div className="border bg-white text-black w-full rounded-lg shadow-sm">
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
									<span className="text-right">{totalNumber}</span>
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
										{"25"} {t("word minute")}
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
					<div>
						<h1
							className={
								i18n.resolvedLanguage == "ar"
									? "direction mb-[1rem] text-[1.25rem]"
									: "mb-[1rem] text-[1.25rem]"
							}
						>
							{t("Transcription")}:
						</h1>
						{
							<div
								className={
									i18n.resolvedLanguage == "ar"
										? "scriptComparison direction"
										: "scriptComparison"
								}
							>
								{AllElementResult.map((item, i) => (
									<span key={i} className={item.className}>
										{item.value}
									</span>
								))}
							</div>
						}
					</div>
				</div>
			)}
		</div>
	);
}

export default SpeechAnalyse;
