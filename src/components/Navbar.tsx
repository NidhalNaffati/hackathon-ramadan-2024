import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher.tsx";

export function Navbar() {
	const {t, i18n} = useTranslation();
	return (
		<nav className=" flex bg-gray-800 py-4 w-full">
			<ul
				className={
					i18n.resolvedLanguage == "en"
						? "flex w-full items-center justify-center"
						: "flex w-full items-center justify-center direction"
				}
			>
				<li className="mr-4">
					<Link to="/" className="text-white hover:text-gray-300">
						{t("navigation:home")}
					</Link>
				</li>
				<li className="mr-4">
					<Link to="/settings" className="text-white hover:text-gray-300">
						{t("navigation:settings")}
					</Link>
				</li>
				<li className="mr-4">
					<Link to="/transcription" className="text-white hover:text-gray-300">
						{t("navigation:transcription")}
					</Link>
				</li>
				<li className="mr-4">
					<Link
						to={"/SpeechAnalyse"}
						className="text-white hover:text-gray-300"
					>
						{t("navigation:speechanalyse")}
					</Link>
				</li>
				<li className="mr-4">
					<Link to={"/tracking"} className="text-white hover:text-gray-300">
						{t("Progress tracking")}
					</Link>
				</li>
			</ul>

			<ThemeSwitcher />
		</nav>
	);
}
